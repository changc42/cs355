/* 09-concurrent-sync.js: Going from Synchronous to Concurrent */

const dns = require("dns");
let domains = ["venus.cs.qc.cuny.edu", "mars.cs.qc.cuny.edu", "cs.qc.cuny.edu", "qc.cuny.edu", "cuny.edu"];

let ip_addresses = [];
let count = 0;

const resolve = function(domain){
	const after_resolution = function(err, records){
		ip_addresses[count] = records;
		count++;
		if(count === domains.length){
			next_task(ip_addresses.flat().join("\r\n"));
		}
	};
	dns.resolve(domain, after_resolution);
};
const next_task = function(str){
	console.log(str);
}
for(let i = 0; i < domains.length; i++){
	resolve(domains[i]);
}