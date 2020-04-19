const quotes = [
  "Be yourself; everyone else is already taken.",
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  "So many books, so little time.",
  "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
  "A room without books is like a body without a soul.",
  "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
  "You only live once, but if you do it right, once is enough."
];

const net = require("net");

const server = net.createServer(c => {
  c.on("end", () => {
    console.log("client disconnected");
  });
  const date = new Date();
  const day = date.getDate();
  const quote = quotes[day % 7];
  c.end(quote);
});

server.on("end", () => {
  console.log("client disconnected");
});

PORT = 3014;
server.listen(PORT, () => {
  console.log("running on port ", PORT);
});
