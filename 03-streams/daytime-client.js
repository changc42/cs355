const server_address = "time-a-g.nist.gov";
const server_port = 13;

const net = require("net");

const connectionData = function(data) {
  console.log(data.toString());
};

const connectionEnd = function() {
  console.log("client disconnected");
};

const connectionStart = function() {
  console.log("connected to server!");
};

const client = net.createConnection(
  server_port,
  server_address,
  connectionStart
);
client.on("data", connectionData);
client.on("end", connectionEnd);
