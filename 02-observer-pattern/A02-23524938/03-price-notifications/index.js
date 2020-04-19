/*
=======================
03 - Price Notifications - index.js
=======================
Student ID:23524938
Comment (Required):
create priceEmitter so that on all newDay events, priceEmitter compares the price of the
stock with the target_price. If the threshold is crossed, priceEmitter will emit a
"thresholdReached" event. On this event, a message will be displayed, and the current_line
will be incremented.
=======================
*/
const DayEmitter = require("./modules/DayEmitter");
const Stock = require("./modules/Stock");
const PriceEmitter = require("./modules/PriceEmitter");

const portfolio_data = require("./data/stocks.json");
const stock_alerts = require("./data/stock-alerts.json");

const day_emitter = new DayEmitter(700);
const portfolio = portfolio_data.map(
  stock => new Stock({ ...stock, day_emitter })
);

let current_line = portfolio.length + 1;

portfolio.forEach(function(stock, index) {
  stock.on("newday", function({ ticker, name, price, previous, change }) {
    process.stdout.cursorTo(0, index + 1);
    process.stdout.clearLine();
    console.log(`${ticker} ${name} ${price.toFixed(2)} ${change.toFixed(2)}`);
    process.stdout.cursorTo(0, current_line);
  });
});

let priceEmitters = [];

portfolio.forEach(stock => {
  if (stock.ticker === "GOOG") {
    priceEmitters.push(new PriceEmitter(stock, 1800, "above"));
    priceEmitters.push(new PriceEmitter(stock, 1300, "below"));
  }
  if (stock.ticker === "APPL") {
    priceEmitters.push(new PriceEmitter(stock, 350, "above"));
    priceEmitters.push(new PriceEmitter(stock, 275, "below"));
  }
});

priceEmitters.forEach(pE => {
  pE.on("thresholdReached", ({ ticker, name, price, previous, change }) => {
    let { target_price, direction } = pE;
    if (direction === "above" && price > target_price) {
      console.log(`${ticker}(${price}) went above ${target_price}`);
      current_line++;
    }

    if (direction === "below" && price < target_price) {
      console.log(`${ticker}(${price}) went below ${target_price}`);
      current_line++;
    }
  });
});

day_emitter.on("newday", function(spec) {
  let { mm_dd } = spec;
  process.stdout.cursorTo(0, 0);
  process.stdout.clearLine();
  process.stdout.write(mm_dd);
  process.stdout.cursorTo(0, current_line);
});
console.clear();
day_emitter.start();
