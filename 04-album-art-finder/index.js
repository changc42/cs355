/*
=-=-=-=-=-=-=-=-=-=-=-=-
Album Art Search
=-=-=-=-=-=-=-=-=-=-=-=-
Student ID:23524938
Comment (Required):

=-=-=-=-=-=-=-=-=-=-=-=-
*/

const url = require("url");
const http = require("http");
const fs = require("fs");
const port = 3000;
const server = http.createServer();

server.on("request", connection_handler);
function connection_handler(req, res) {
  console.log(`New Request for ${req.url} from ${req.socket.remoteAddress}`);
  if (req.url === "/") {
    const main = fs.createReadStream("html/main.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    main.pipe(res);
  } else if (req.url === "/favicon.ico") {
    const icon = fs.createReadStream("images/favicon.ico");
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    icon.pipe(res);
  } else if (req.url === "/images/banner.jpg") {
    const banner = fs.createReadStream("images/banner.jpg");
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    banner.pipe(res);
  } else if (req.url.startsWith("/album-art/")) {
    let image_stream = fs.createReadStream(`.${req.url}`);
    image_stream.on("error", function (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not found");
      res.end();
    });
    image_stream.on("ready", function () {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      image_stream.pipe(res);
    });
  } else if (req.url.startsWith("/search")) {
    let urlObj = url.parse(req.url, true);
    res.write(urlObj.query.artist);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not found");
    res.end();
  }
}

server.on("listening", listening_handler);
server.listen(port);
function listening_handler() {
  console.log(`Now Listening on Port ${port}`);
}
