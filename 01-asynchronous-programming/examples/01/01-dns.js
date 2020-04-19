/* 01-dns.js */

const dns = require("dns");
let domain = "google.com";
const after_resolution = function(err, records) {
  if (err) {
    console.error("Failed to resolve", domain);
  } else {
    console.log(domain, records);
  }
};
dns.resolve(domain, after_resolution);
