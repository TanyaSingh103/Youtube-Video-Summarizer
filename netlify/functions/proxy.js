const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const response = await axios.post('https://n8n-dev.subspace.money/webhook-test/youtube-summarizer', JSON.parse(event.body), {
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers, such as authentication tokens if needed
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to forward request' }),
    };
  }
};
