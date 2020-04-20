/* 03-dns-sync-venus-then-mars.js: Resolving Two Domains Synchronously */
const dns = require("dns");
let venus = "venus.cs.qc.cuny.edu";
let mars = "mars.cs.qc.cuny.edu";
let ip_addresses = [];
const after_venus = function(err, records) {
  if (err) {
    console.error("Failed to resolve", venus);
  } else {
    ip_addresses.push("venus");
  }
  dns.resolve(mars, after_mars);
};
const after_mars = function(err, records) {
  if (err) {
    console.error("Failed to resolve", mars);
  } else {
    ip_addresses.push("mars");
  }
  console.log(ip_addresses);
};
dns.resolve(venus, after_venus);
