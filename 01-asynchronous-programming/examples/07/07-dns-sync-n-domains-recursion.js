/* 07-dns-sync-n-domains-recursion.js: N Domains Synchronously */
const dns = require("dns");
let domains = ["venus.cs.qc.cuny.edu", "mars.cs.qc.cuny.edu", "earth.cs.qc.cuny.edu", "cs.qc.cuny.edu", "qc.cuny.edu", "definitely.not.a.domain", "cuny.edu"];
let ip_addresses = [];
let count = 0;

const after_resolved = function(err, records){
	count++;
	ip_addresses.push(records);
	if(count === domains.length){
		console.log(ip_addresses);		//all domains.length resolved
	}
	else{
		dns.resolve(domains[count], after_resolved);	//more domains to resolve
	}
};
dns.resolve(domains[count], after_resolved);