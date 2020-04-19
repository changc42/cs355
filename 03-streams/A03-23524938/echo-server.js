const net = require("net");

const server = net.createServer(c => {
  c.on("end", () => {
    console.log("client disconnected");
  });
  c.pipe(c);
});

PORT = 3015;
server.listen(PORT, () => {
  console.log("running on port ", PORT);
});
