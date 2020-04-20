/* 08-sync-concurrent.js: Going from Synchronous to Concurrent */

const fs = require("fs");
const dns = require("dns");
const input_file = "input/domains.txt"
let ip_addresses = [];
let count = 0;

const after_read = function(err, data){
	if(err){
		console.error(err);
	}
	else{
		let domains = data.split('\r\n');			//split String on newlines
		for(let i=0 ; i < domains.length; i++){
			resolve(domains[i]);
		}
	}
};
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

fs.readFile(input_file, "utf8", after_read);