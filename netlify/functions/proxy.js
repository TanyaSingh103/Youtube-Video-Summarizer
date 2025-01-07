// netlify/functions/proxy.js
const fetch = require('node-fetch'); // Make sure node-fetch is installed in your project

exports.handler = async (event, context) => {
  const { youtubeUrl } = JSON.parse(event.body);

  const response = await fetch('https://n8n-dev.subspace.money/webhook-test/youtube-summarizer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ youtubeUrl }),
  });

  if (!response.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to summarize the video' }),
    };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ summary: data.summary }),
  };
};
