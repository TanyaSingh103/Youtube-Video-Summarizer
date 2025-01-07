// netlify/functions/youtube-summarizer.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Get the YouTube URL from the request body
    const { youtubeUrl } = JSON.parse(event.body);

    // Call your n8n endpoint to get the summary (replace with your actual n8n webhook URL)
    const n8nResponse = await fetch('https://n8n-dev.subspace.money/webhook-test/youtube-summarizer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ youtubeUrl }),
    });

    if (!n8nResponse.ok) {
      throw new Error('Failed to summarize the video');
    }

    const summaryData = await n8nResponse.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: summaryData.summary }),
    };
  } catch (error) {
    console.error('Error summarizing the video:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to summarize the video' }),
    };
  }
};
