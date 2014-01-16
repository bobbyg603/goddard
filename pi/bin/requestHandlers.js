//var exec = require("child_process").exec;
var querystring = require("querystring");
var wolfram = require("wolfram").createClient("2P3U5X-5YLPLVYPJH");
var sys = require("sys");
var util = require("util");
var fs = require("fs");
var formidable = require("formidable");
//var exec = require("exec");

//function start(response, postData) {
function start(response) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>' +
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html"; ' +
	'charset=UTF-8" />' +
	'</head>' +
	'<body>' +
	'<h1>goddard</h1>' +
	'<h2>upload file</h2><br/>' +
	'<form action="/upload" enctype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" multiple="multiple">' +
	'<input type="submit" value="Upload file" />' +
	'</form>' +
	'<h2>text command</h2><br/>' +
	'<form action="/cmd" method="post">' +
	'<input type="text" name="cmd"/><br/>' +
	'<input type="submit" value="Submit text"/>' +
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
		response.write("Recieved image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function cmd(response, request) {
    
    var form = new formidable.IncomingForm();
    var fields = [];
    console.log("about to parse...");
    var q = "";

    form
        .on('eror', function(err) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end('error:\n\n'+util.inspect(err));
        })
        .on('field', function(field, value) {
            console.log(field,value);
            fields.push([field,value]);
        })
        .on('end', function() {
            console.log('-> post done');
            response.writeHead(200, {'Content-type': 'text/html'});
            
            q = fields[0][1];
            console.log("fields: " +q);
            response.write("You've sent the command: " + q +"<br/><br/>");


            if(q  === "speak") {
                response.write("bark bark!<br/><br/>");
            } else if(q === "come") {
                response.write("I'm coming!<br/><br/>");
            } else if(q === "sleep") {
                response.write("Zzzzzzzzz<br/><br/>");
            } else if(q === "dance"){
                response.write("<img src='http://i.imgur.com/WgOXCne.gif'/><br/><br/>");
            } else {
                console.log("Executing...");
	
                response.write("Command not understood yet!<br/><br/>");
                 /*
                    wolfram.query(q, function(err, result) {
                        if(err) throw err;
                        if(typeof(result[0]) === "undefined" || typeof(result[1]) === "undefined") console.log("Error! results array is undefined");
                        else {
                            var newResult = result[0].subpods[0].value+ "\n" + result[1].subpods[0].value + "\n";
                            console.log(newResult);
                            response.write(newResult+"<br/><br/>");
                        }
                    });
                    exec("ls -lah", function(error, stdout, stderr) {
                        console.log(stdout);
                    });   
                console.log("Done Executing");
                
                */
            }

            response.end('received fields:\n\n'+util.inspect(fields));
        });
    form.parse(request);
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type" : "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.cmd = cmd;
