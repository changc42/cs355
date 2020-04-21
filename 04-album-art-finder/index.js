/*
=-=-=-=-=-=-=-=-=-=-=-=-
Album Art Search
=-=-=-=-=-=-=-=-=-=-=-=-
Student ID:23524938
Comment (Required):

this script sets up a http server which listens for requests.
if a request is made to '/', user is given a form which takes in a query and initiates search
if url starts with 'album art', if suffix is valid, send img, else send 404
if url starts with 'search', get albums related to search query from spotify api and show images 
if none of above, send 404
=-=-=-=-=-=-=-=-=-=-=-=-
*/

const url = require("url");
const https = require("https");
const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const create_search_req = require("./create_search_req");

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
    create_search_req(urlObj.query.artist, res);
  } else if (req.url === "/test") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<img src='/album-art/75N0Z60SNMQbAPYZuxKgWd.jpg' alt='here is an img'/>"
    );
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
