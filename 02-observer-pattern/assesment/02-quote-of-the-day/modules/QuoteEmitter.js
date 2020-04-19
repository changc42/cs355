/*
=======================
02 - Quote of the Day - QuoteEmitter.js
=======================
Student ID:
Comment (Required):
write quoteEmitter so that whenever day_emitter emits a newday, quote_emitter emits
a "qotd" event. On a "qotd" event console.log() a random quote.
=======================
*/
let quotes = require("../data/quotes.json");

const EventEmitter = require("events");
class QuoteEmitter extends EventEmitter {
  constructor(day_emitter) {
    super();
    day_emitter.on("newday", () => {
      this.emit("qotd", quotes[Math.floor(Math.random() * 10)]);
    });
    this.on("qotd", quote => {
      console.log(quote);
    });
  }
}
module.exports = QuoteEmitter;
