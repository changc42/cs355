/* 02-dns-sync-incorrect.js : INCORRECT */

const dns = require("dns");
let domain = "venus.cs.qc.cuny.edu";
let data;
const after_resolution = function(err, records){
    if(err){
        console.error("Failed to resolve", domain);
    }
    else{
    	data = records;
    }
};
const next_task = function(input){
	console.log(input);
};
dns.resolve(domain, after_resolution);
next_task(data);