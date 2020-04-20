/*
=======================
04-four-synchronous-tasks.js
=======================
Student ID:
Comment (Required):
first read input file,
then inflate the data and convert it to a domain name using toString.
then get ip address using resolve
then write file
=======================
*/
const fs = require("fs");
const dns = require("dns");
const zlib = require("zlib");
const input_file = "./input/domain.deflated";
const output_file = "./output/ip_address.txt";

fs.readFile(input_file, (err, data) => {
  zlib.inflate(data, (err, unzipped) => {
    let domain = unzipped.toString("utf8");
    dns.resolve(domain, (err, records) => {
      fs.writeFile(output_file, records[0], () => {});
    });
  });
});
