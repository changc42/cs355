/* Example 01A: readline-a.js */

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

rl.on('line', (input) => {
	console.log(`Received: ${input}`);
});
console.log("Enter any input and press enter to fire line event");
