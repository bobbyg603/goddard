//var exec = require("child_process").exec;
var querystring = require("querystring");
//var wolfram = require("wolfram").createClient("2P3U5X-5YLPLVYPJH");
var sys = require("sys");
var fs = require("fs");
var formidable = require("formidable");

//function start(response, postData) {
function start(response) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>' +
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html"; ' +
	'charset=UTF-8" />' +
	'</head>' +
	'<body>' +
	'<form action="/upload" enctype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" multiple="multiple">' +
	'<input type="submit" value="Upload file" />' +
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

//function upload(response, postData) {
function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse...");

	form.parse(request, function(error, fields, files) {
		console.log("parsing done.");
		
		fs.rename(files.upload.path, "/tmp/test.png", function(error) {
			if (error) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
	
		response.writeHead(200, {"Content-Type": "text/html"});
		//response.write("You've sent the text " + querystring.parse(postData).text);	
		response.write("Recieved image:<br/>");
		response.write("<img src='/show' />");
		
	/*
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

		
		wolfram.query(q, function(err, result) {
		  if(err) throw err;
		  var newResult = result[0].subpods[0].value;
		  console.log(newResult);
		})
		
	
		console.log("Done Executing");
	}
	*/
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type" : "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
