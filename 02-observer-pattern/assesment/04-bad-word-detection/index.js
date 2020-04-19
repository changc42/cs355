/*
=======================
04 - Bad Word Detection - index.js
=======================
Student ID:
Comment (Required):
badWordEmitter takes in an array of bad words and the readLineEmitter. Everytime a line
event occurs, badWordEmitter checks if the input string contains any bad words. For each
bad word, a "badWordDetected" event is emitted. Everytime a bad word detected event is 
emitted, the badWordEmitter's internal counter is incremented and printed.
=======================
*/
const readline = require("readline");
const BadWordEmitter = require("./modules/BadWordEmitter");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const badwords = require("./data/badwords.json");

let current_line = 0;

const shell_prompt = function() {
  current_line++;
  process.stdout.write("> ");
};
rl.on("line", shell_prompt);
const badW_emitter = new BadWordEmitter(badwords, rl);
badW_emitter.on("badWordDetected", function() {
  this.badWordCount++;
  process.stdout.cursorTo(20, 0);
  process.stdout.write(`| Bad Word Count: ${this.badWordCount}`);
  process.stdout.cursorTo(2, current_line);
});
console.clear();
console.log("Welcome to the chat");
shell_prompt();
