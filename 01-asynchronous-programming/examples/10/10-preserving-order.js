/* 10-preserving-order.js: Preserving Order by Reserving Space */

const dns = require("dns");
let domains = ["venus.cs.qc.cuny.edu", "mars.cs.qc.cuny.edu", "cs.qc.cuny.edu", "qc.cuny.edu", "cuny.edu"];

let ip_addresses = Array(domains.length);
let count = 0;

const resolve = function(domain, index){
	const after_resolution = function(err, records){
		ip_addresses[index] = records;
		count++;
		console.log(ip_addresses);
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
	resolve(domains[i], i);
}