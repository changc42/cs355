/* 04-dns-concurrency.js: Resolving Two Tasks Concurrently */
const dns = require("dns");
let venus = "venus.cs.qc.cuny.edu";
let mars  = "mars.cs.qc.cuny.edu";
let ip_addresses = [];

const after_venus = function(err, records){
	if(err){
		console.error("Failed to resolve", venus);
	}
	else{
		console.log(venus, records);
	}
};
const after_mars = function(err, records){
	if(err){
		console.error("Failed to resolve", mars);
	}
	else{
		console.log(mars, records);
	}
};

dns.resolve(venus, after_venus);
console.log("Prints Immediately 01");
dns.resolve(mars, after_mars);
console.log("Prints Immediately 02");