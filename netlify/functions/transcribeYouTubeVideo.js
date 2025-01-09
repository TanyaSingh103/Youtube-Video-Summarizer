const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // Parse input from Hasura's request body
    const body = JSON.parse(event.body);
    const { videoUrl } = body.input;

    if (!videoUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Video URL is required' }),
      };
    }

    // Securely use RapidAPI key from Netlify environment variables
    const RAPIDAPI_KEY = process.env.RAPIDAPI_YOUTUBE_KEY;

    const response = await fetch('https://youtube-transcriptor.p.rapidapi.com', {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_url: videoUrl }),
    });

    const data = await response.json();

    if (data.transcript) {
      return {
        statusCode: 200,
        body: JSON.stringify({ transcript: data.transcript }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to transcribe video' }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
