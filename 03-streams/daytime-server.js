// "use strict";
// const net = require("net");

// const server = net.createServer();
// const connectionError = function(err) {
//   throw err;
// };

// const connectionListener = function(socket) {
//   const connectionEnd = function() {
//     console.log("client disconnected");
//   };
//   const daytime = new Date().toString();
//   console.log("client connected");
//   socket.on("end", connectionEnd);
//   socket.end(`${daytime}\r\n`);
// };
// const connectionStart = function() {
//   console.log("server bound");
// };

// server.on("error", connectionError);
// server.on("connection", connectionListener);
// server.on("listening", connectionStart);

// server.listen(3013);

const net = require("net");
const server = net.createServer(c => {
  // 'connection' listener.
  console.log("client connected");
  c.on("end", () => {
    console.log("client disconnected");
  });
  c.write("hello\r\n");
  c.pipe(c);
});
server.on("error", err => {
  throw err;
});
server.listen(8124, () => {
  console.log("server bound");
});
