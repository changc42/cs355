const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const endpoints = require("./auth/endpoints");
const { client_id, state } = require("./auth/keys");
const scopes = require("./auth/scopes");

let server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlFile = fs.createReadStream("./html/landing.html");
    htmlFile.pipe(res);
  } else if (req.url == "/auth") {
    let query = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/authredirect",
      response_type: "token",
      scope: scopes.read,
      state: state,
    };
    let queryString = new URLSearchParams(query).toString();
    console.log(queryString);
    res.writeHead(302, { Location: `${endpoints.oauth}?${queryString}` });
    res.end();
  } else if (req.url.startsWith("/authredirect")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(
      "You have been successfully redirected from google's auth page back to the app"
    );
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
