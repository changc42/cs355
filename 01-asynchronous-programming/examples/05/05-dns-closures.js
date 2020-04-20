/* 05-dns-closures.js */
const dns = require("dns");
let venus = "venus.cs.qc.cuny.edu";
let mars  = "mars.cs.qc.cuny.edu";
let ip_addresses = [];

const resolve = function(domain){
	const after_resolution = function(err, records){
		if(err){
			console.error("Failed to resolve", domain);
		}
		else{
			console.log(domain, records);
		}
	};
	dns.resolve(domain, after_resolution);
};
resolve(venus);
resolve(mars);