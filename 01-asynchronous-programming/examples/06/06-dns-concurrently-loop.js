/* 06-dns-concurrently-loop.js */
const dns = require("dns");
const domains = ["venus.cs.qc.cuny.edu", "mars.cs.qc.cuny.edu", "earth.cs.qc.cuny.edu", "cs.qc.cuny.edu", "qc.cuny.edu", "definitely.not.a.domain", "cuny.edu"];

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
for(let i = 0; i < domains.length; i++){
	resolve(domains[i]);
}