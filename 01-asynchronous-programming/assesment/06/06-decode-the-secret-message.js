/*
=======================
06-decode-the-secret-message.js
=======================
Student ID:
Comment (Required):

=======================
*/
const fs = require("fs");
const zlib = require("zlib");
const files_dir = "./input/";
const files = fs.readdirSync(files_dir);

const n = files.length; //input size 0 < n < 100

bufferList = [];
function rec() {
  if (bufferList.length === n) {
    fs.writeFile(
      "output/secret-message.zip",
      Buffer.concat(bufferList, 100),
      err => {
        if (err) console.log(err);
        fs.readFile("output/secret-message.zip", "utf8", (err, data) => {
          console.log(data);
        });
      }
    );
    return;
  }

  fs.readFile(
    `input/${(bufferList.length + 1).toString().padStart(2, 0)}`,
    (err, data) => {
      zlib.inflate(data, (err, buff) => {
        bufferList.push(buff);
        rec();
      });
    }
  );
}

rec();
