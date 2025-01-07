const https = require("https");

exports.handler = async (event, context) => {
  const n8nWebhookUrl = "https://n8n-dev.subspace.money/webhook-test/youtube-summarizer"; // Your n8n webhook URL

  const headers = {
    "Access-Control-Allow-Origin": "*", // Allow all domains
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed methods
    "Access-Control-Allow-Headers": "Content-Type", // Allow content-type headers
  };

  // Handle preflight OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Make a request to n8n's API
  const response = await new Promise((resolve, reject) => {
    const req = https.request(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }, (res) => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers,
          body: data,
        });
      });
    });

    req.on("error", (error) => {
      reject({
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      });
    });

    req.write(event.body); // Pass the incoming request body to n8n
    req.end();
  });

  return response;
};
