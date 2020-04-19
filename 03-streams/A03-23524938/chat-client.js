//connects to port 5500

const server_address = "173.68.173.73";
const server_port = 13;

const net = require("net");
const readline = require("readline");

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nickname;

const connectionStart = function () {
  console.log("connected to server!");
  io.question("Enter your name: ", (ans) => {
    nickname = ans;
    chat();
  });
};

function chat() {
  io.question(`[${nickname}]: `, (ans) => {
    if (ans === "/exit") {
      client.end(() => process.exit());
    } else {
      client.write(`[${nickname}]: ${ans}`);
      chat();
    }
  });
}

const client = net.createConnection(
  server_port,
  server_address,
  connectionStart
);
client.on("data", (msg) => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  console.log(msg.toString());
  process.stdout.write(`[${nickname}]: `);
});
client.on("end", () => {
  console.log("client disconnected");
});
