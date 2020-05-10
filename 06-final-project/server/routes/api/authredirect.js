const url = require("url");
const https = require("https");
const fs = require("fs");

const { client_id, client_secret } = require("../../auth/keys");

module.exports = (req, res, db) => {
  // takes in empty accessToken object as parameter and inserts accessToken into it
  // after get access token, sends user a form
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
      // "Content-Length": Buffer.byteLength(queryString),
    },
  };
  let sb = "";
  let tokenReq = https.request(options, (tokenRes) => {
    tokenRes.on("data", (chunk) => {
      sb += chunk.toString();
    });
    tokenRes.on("end", () => {
      db.accessToken = JSON.parse(sb).access_token;
      res.writeHead(200, { "Content-Type": "text/html" });
      let htmlFile = fs.createReadStream("./html/query.html");
      htmlFile.pipe(res);
    });
  });
  tokenReq.end(queryString);
};
