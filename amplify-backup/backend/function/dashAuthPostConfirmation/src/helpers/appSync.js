const https = require("https");
const http = require("http");
const { URL } = require("url");
const AWS = require("aws-sdk");

// Helper function to generate a signed AppSync request
function sendAppSyncRequest(url, region, method, data, apiKey) {
  console.log(url, region, method, data, apiKey);
  const endpoint = new URL(url).hostname;
  const port = new URL(url).port;
  const req = new AWS.HttpRequest(url, region);

  req.method = method;
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.headers["x-api-key"] = apiKey;
  req.body = JSON.stringify(data);

  // Determine whether to use http or https based on apiKey
  const httpRequestModule = apiKey.includes("fakeApi") ? http : https;

  return new Promise((resolve, reject) => {
    const httpRequest = httpRequestModule.request(
      { ...req, host: endpoint, port: port }, // set the port explicitly
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const response = JSON.parse(body);
          response.errors && response.errors.length > 0
            ? reject(new Error(response.errors[0].message))
            : resolve(response);
        });
      }
    );

    httpRequest.on("error", (error) => {
      console.error(error.stack);
      reject(error);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
}

module.exports = {
  sendAppSyncRequest,
};
