/*
=======================
04 - Bad Word Detection - BadWordEmitter.js
=======================
Student ID:
Comment (Required):

=======================
*/
const EventEmitter = require("events");
const badwords = require("../data/badwords.json");
class BadWordEmitter extends EventEmitter {
  constructor(badwords, line_emitter) {
    super();
    this.badWordCount = 0;
    line_emitter.on("line", input => {
      let arr = input.split(" ");
      let filtered = arr.filter(e => badwords.includes(e));
      filtered.forEach(e => {
        this.emit("badWordDetected");
      });
    });
  }
}
module.exports = BadWordEmitter;
