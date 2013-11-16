var exec = require("child_process").exec;
var querystring = require("querystring");
var wolfram = require('wolfram-alpha').createClient("2P3U5X-5YLPLVYPJH");
var sys = require('sys');

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>' +
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html"; ' +
	'charset=UTF-8" />' +
	'</head>' +
	'<body>' +
	'<form action="/upload" method="post">' +
	'<textarea name="text" rows="20" cols="60"></textarea>' +
	'<input type="submit" value="Submit text" />' +
	'</form>' +
	'</body>' +
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

	/*
	exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
	*/
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});

	var q = querystring.parse(postData).text;

	if(q  === "speak") {
		response.write("bark bark!");
	} else if(q === "come") {
		response.write("I'm coming!");
	} else if(q === "sleep") {
		response.write("Zzzzzzzzz");
	} else if(q === "dance"){
		response.write("I'm dancin'!");
	} else {
		console.log("Executing...");
		
		response.write("You've sent: " + q);

		/*
		wolfram.query(q, function(err, result) {
		  if(err) throw err;
		  var newResult = result[0].subpods[0].value;
		  console.log(newResult);
		})
		*/

		console.log("Done Executing");
	}
	response.end();
}

exports.start = start;
exports.upload = upload;
