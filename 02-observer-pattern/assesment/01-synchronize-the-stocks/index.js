/*
=======================
01 - Synchronize the Stocks - QuoteEmitter.js
=======================
Student ID:23524938
Comment (Required):
note: changed "newday" to "newdayStock" and "newdayDay" to differentiate "newday"
Created Table emitter which is aware of all the stock emitters. The stock_emitters handle a
"new day" event in the order they were constructed, so when the last stock_emitter
recieves a "new day" event, this means the table data is updated. Write listeners for
each stock_emitter identically except for the last one. For the last stock_emitter, 
console.table() the table.
=======================
*/

const Stock = require("./modules/Stock");
const DayEmitter = require("./modules/DayEmitter");
const portfolio_data = require("./data/stocks.json");
const TableEmitter = require("./modules/TableEmitter");

const day_emitter = new DayEmitter(1000);

day_emitter.on("newdayDay", function({ mm_dd }) {
  console.clear();
  console.log(mm_dd);
});

let portfolio = portfolio_data.map(
  stock => new Stock({ ...stock, day_emitter })
);
let current_line = portfolio.length + 1;
let myTable = [];

let table_emitter = new TableEmitter(portfolio);

day_emitter.start();
