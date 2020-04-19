/*
=======================
05-batch-b.js
=======================
Student ID:
Comment (Required):
'total' records number of files read
'batchContent' is a string which is appended to after reads. If 'b' files were read,
batchContent is written to a file and resetted to empty string.
'batchNumber' records number of files written.

First, concurrently read 'n' files. As soon as enough files are read to fill a batch, 
pass batchContent and number to write function. Immediately reset batchContent and increment batch number.
=======================
*/
const fs = require("fs");
const input_dir = "./input/";
const output_dir = "./output/";
const input_files = fs.readdirSync(input_dir);

const n = input_files.length; //input size 0 < n < 100
const b = 5; //input size 0 < b < n

let total = 0;
let batchContent = "";
let batchNumber = 0;

for (let i = 1; i <= n; i++) {
  fs.readFile(
    `input/${i.toString().padStart(2, 0)}-input.txt`,
    "utf8",
    (err, data) => {
      batchContent += data + "\n";
      total++;
      if (total % b === 0 || total === n) {
        batchNumber++;
        fs.writeFile(
          `output/${batchNumber.toString().padStart(2, 0)}-output.txt`,
          batchContent,
          () => {}
        );
        batchContent = "";
      }
    }
  );
}
