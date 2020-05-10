const http = require("http");

let setupRoutes = require("./routes");

let server = http.createServer();

setupRoutes(server);

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
