/*
=======================
03-personal-hosts-file.js
=======================
Student ID:
Comment (Required):
First, read data from input file. Create an array of strings using split(). For each
domain in the array, retrieve IP Address and append "IP + domain" to variable 'content'.
Each time content is appended to, increment 'total' variable. If 'total' equals the length
of the array, write 'content' to output_file.
=======================
*/
const fs = require("fs");
const dns = require("dns");
const input_file = "./input/domains.txt";
const output_file = "./output/hosts.txt";

let content = "";
let total = 0;

fs.readFile(input_file, "utf8", (err, data) => {
  let strArr = data.split("\r\n");
  strArr.forEach(e => {
    dns.resolve(e, (err, records) => {
      if (err) console.log(err);
      else {
        content += `${records}\t${e}\n`;
        total++;
        if (total == strArr.length)
          fs.writeFile(output_file, content, () => {});
      }
    });
  });
});
