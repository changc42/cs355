/* 12-decompressing-with-inflate.js: Deompressing with Inflate */
const fs = require("fs");
const zlib = require("zlib");
const input_file = "./input/content.deflated";

fs.readFile(input_file, {encoding:null}, function(err, data){
	if(err){
		console.log(err);
	}
	zlib.inflate(data, function(err, buf){
		if(err){
			console.log(err);
		}
		else{
			console.log(buf.toString("utf8"));
		}
	});
});