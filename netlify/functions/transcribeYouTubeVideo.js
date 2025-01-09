const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // Parse input from Hasura's request body
    const body = JSON.parse(event.body);
    const { videoId } = body.input; // Use "videoId" instead of "videoUrl"

    if (!videoId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Video ID is required' }),
      };
    }

    // Securely use RapidAPI key from Netlify environment variables
    const RAPIDAPI_KEY = process.env.RAPIDAPI_YOUTUBE_KEY;

    // Construct the GET request URL with query parameter
    const apiUrl = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${videoId}`;

    // Send the GET request to RapidAPI
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    });

    const data = await response.json();

    if (data.transcript) {
      return {
        statusCode: 200,
        body: JSON.stringify({ transcript: data.errors.response.details.transcriptionAsText }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to transcribe video', details: data }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', details: error.message }),
    };
  }
};
