//runs on port 5500

const net = require("net");
const fs = require("fs");

let connections = [];
const server = net.createServer((client) => {
  console.log(client.remotePort, " connected");
  client.on("end", () => {
    console.log("client disconnected");
    let index = connections.indexOf(client);
    connections.splice(index, 1);
  });
  client.on("error", () => {
    console.log("client disconnected");
    let index = connections.indexOf(client);
    connections.splice(index, 1);
  });
  client.on("data", (msg) => {
    console.log(msg.toString());
    connections.forEach((connection) => {
      if (client == connection) return;
      connection.write(msg);
    });
  });
  connections.push(client);
});

server.on("error", (err) => {
  throw err;
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log("server bound. listening on port ", PORT);
});
