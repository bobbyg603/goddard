var wolfram = require('wolfram').createClient("2P3U5X-5YLPLVYPJH");
var talk = require('./speak.js');

exports.ask = function start(q) {
    var finalResult = "";

	console.log("\nSending Query to Wolfram...\n");
	
	//Query Wolfram where q is the query
	wolfram.query(q, function(err, result) {
		if(err) throw err;
		
		//Uncomment to see Raw Data
		//console.log("The result is: %j \n",result);

		//Try and get the first 2 results, make sure the 2nd isn't undefined
		if(typeof(result[0]) === "undefined" || typeof(result[1]) === "undefined") console.log("Error! results array is undefined");
		else {
			//Set newResults equal to the first 2 subpods
			var newResult = result[0].subpods[0].value + "\n" + result[1].subpods[0].value + "\n";
			
			//Replace characters in mathematic operations with spoken english equivalents
			finalResult = newResult.replace("+"," plus ").replace("-"," minus ").replace("$"," in US Dollars ");
		}
	console.log(finalResult);
	talk.say(finalResult);
    });
};