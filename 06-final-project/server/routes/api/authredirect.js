const { client_id, client_secret } = require("../../auth/keys");
const url = require("url");
const https = require("https");

module.exports = (req, res, accessToken) => {
  // takes in empty accessToken object as parameter and inserts accessToken into it
  let authCode = url.parse(req.url, true).query.code;
  let query = {
    client_id: client_id,
    client_secret: client_secret,
    code: authCode,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/api/authredirect",
  };
  let queryString = new URLSearchParams(query).toString();
  const options = {
    method: "POST",
    hostname: "oauth2.googleapis.com",
    path: "/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(queryString),
    },
  };
  let client = https.request(options, (tokenRes) => {
    tokenRes.on("data", (chunk) => {
      accessToken.accessToken = JSON.parse(chunk.toString()).access_token;
      client.end();
      res.writeHead(302, { Location: "/query" });
      res.end();
    });
  });
  client.write(queryString);
  return authCode;
};
