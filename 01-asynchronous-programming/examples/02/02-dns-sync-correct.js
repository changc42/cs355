/* 02-dns-sync-correct.js : CORRECT */

const dns = require("dns");
let domain = "venus.cs.qc.cuny.edu";
let data;
const after_resolution = function(err, records) {
  if (err) {
    console.error("Failed to resolve", domain);
    next_task();
  } else {
    data = records;
    next_task();
  }
};
const next_task = function(input = "default") {
  console.log(input);
};
dns.resolve(domain, after_resolution);
