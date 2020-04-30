const http = require("http");
const endpoints = require("./auth/endpoints");

let server = http.createServer();

server.on("request", (req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Welcome to the landing page");
    res.end();
  }
  if (req.url == "/auth") {
    res.writeHead(302, { Location: `${endpoints.oauth}` });
    res.end();
  }
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
