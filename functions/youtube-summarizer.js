const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Parse the YouTube URL from the incoming request body
    const { youtubeUrl } = JSON.parse(event.body);

    // Fetch data from the n8n webhook
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

    // Parse the summary from the n8n response
    const summaryData = await n8nResponse.json();
    
    // Return the summary data as JSON response
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: summaryData.summary }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to summarize the video' }),
    };
  }
};
