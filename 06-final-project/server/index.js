const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");
const endpoints = require("./auth/endpoints");
const { client_id, client_secret, state } = require("./auth/keys");
const scopes = require("./auth/scopes");

let server = http.createServer();

let authCode;
let accessToken;

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlFile = fs.createReadStream("./html/landing.html");
    htmlFile.pipe(res);
  } else if (req.url == "/auth") {
    let query = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/authredirect",
      response_type: "code",
      scope: scopes.read,
      state: state,
    };

    let queryString = new URLSearchParams(query).toString();
    res.writeHead(302, { Location: `${endpoints.oauth}?${queryString}` });
    res.end();
  } else if (req.url.startsWith("/authredirect")) {
    authCode = url.parse(req.url, true).query.code;
    let query = {
      client_id: client_id,
      client_secret: client_secret,
      code: authCode,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/query",
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
        console.log(chunk.toString());
      });
    });
    client.write(queryString);
    client.end();
  } else if (req.url === "/query") {
    res.write("sup");
    res.end();
  } else if (req.url.startsWith("/testForm")) {
    res.write("made it");
    res.end();
  } else {
    let target = path.join(__dirname, "static", req.url);
    if (fs.existsSync(target)) {
      let staticFile = fs.createReadStream(target);
      staticFile.pipe(res);
    } else {
      res.write("404");
      res.end();
    }
  }
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
