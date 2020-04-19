/*
=======================
02 - Quote of the Day - index.js
=======================
Student ID:23524938
Comment (Required):write quoteEmitter so that whenever day_emitter emits a newday, quote_emitter emits
a "qotd" event. On a "qotd" event console.log() a random quote.

=======================
*/
const DayEmitter = require("./modules/DayEmitter");
const QuoteEmitter = require("./modules/QuoteEmitter");

const day_emitter = new DayEmitter(1000);

day_emitter.on("newday", function({ mm_dd }) {
  console.clear();
  process.stdout.cursorTo(0, 0);
  process.stdout.clearLine();
  console.log(mm_dd);
});
const quote_emitter = new QuoteEmitter(day_emitter);
day_emitter.start();
