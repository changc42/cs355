const EventEmitter = require("events");

class TableEmitter extends EventEmitter {
  constructor(portfolio) {
    super();
    this.table = [];
    portfolio.forEach((stock, index) => {
      stock.on(
        "newdayStock",
        ({ mm_dd, ticker, name, price, previous, change }) => {
          this.table[index] = {
            mm_dd,
            ticker,
            name,
            price,
            previous,
            change
          };
          if (index === portfolio.length - 1) this.emit("updated");
        }
      );
    });
    this.on("updated", () => {
      console.table(this.table);
    });
  }
}

module.exports = TableEmitter;
