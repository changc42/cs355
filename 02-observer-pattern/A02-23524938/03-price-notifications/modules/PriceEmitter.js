/*
=======================
03 - Price Notifications - PriceEmitter.js
=======================
Student ID:
Comment (Required):

=======================
*/
const EventEmitter = require("events");
class PriceEmitter extends EventEmitter {
  constructor(stock_emitter, target_price, direction) {
    super();
    this.target_price = target_price;
    this.direction = direction;
    stock_emitter.on("newday", ({ ticker, name, price, previous, change }) => {
      this.emit("thresholdReached", { ticker, name, price, previous, change });
    });
  }
}
module.exports = PriceEmitter;
