/*
=======================
01-n-files-asynchronously.js
=======================
Student ID:
Comment (Required):
define 'total' variable which records the total number of files written so far.
create a loop which immediately begins all async functions immediately/concurrently.
each time an async function is called, the 'counter' is passed into the function. We create
a separate 'counter' variable with the value of 'i', so when 'i' is incremented, 'counter'
is not also incremented. In each callback, 'total' is incremented. If 'total' is equal
to 'n', console.log "Writing Complete"
=======================
*/
const fs = require("fs");
const n = 5; //input size 0 < n < 100

var total = 0;

for (let i = 1; i <= n; i++) {
  let counter = i;
  fs.writeFile(
    `output/${counter.toString().padStart(2, 0)}-output.txt`,
    "Data-1",
    () => {
      console.log(`${counter.toString().padStart(2, 0)}-output.txt`);
      total++;
      if (total === n) console.log("Writing Complete");
    }
  );
}
