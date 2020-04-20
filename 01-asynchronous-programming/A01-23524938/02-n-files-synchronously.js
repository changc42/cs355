/*
=======================
02-n-files-synchronously.js
=======================
Student ID:
Comment (Required):
First create a 'total' variable which records the total number of files read
Create a recursive function and call it once to complete task. Each recursive call
checks if total is less than 'n', the input. If total is less than n, execute the write function. This 
write function's callback will increment 'total', and call the recursive function.
If total is equal to n, do nothing.
=======================
*/
const fs = require("fs");
const n = 5; //input size 0 < n < 100

total = 0;

function recur() {
  if (total < n)
    fs.writeFile(
      `output/${(total + 1).toString().padStart(2, "0")}-output.txt`,
      "Data-2",
      () => {
        console.log(`${(total + 1).toString().padStart(2, "0")}-output.txt`);
        total++;
        recur();
        if (total === n) console.log("Writing Complete");
      }
    );
}

recur();
