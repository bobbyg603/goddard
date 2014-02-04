//Node Modules
var util = require("util");
var fs = require("fs");
var formidable = require("formidable");

//Goddard Modules
var wolfram = require('./modules/wolfram.js');


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
    //Set up variables to parse text command
    var form = new formidable.IncomingForm();
    var fields = [];
    var q = "";
    var action = "";
    var arguement = "";
    
    console.log("about to parse...");

    //Formidable get command from textbox
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

        //Take input and seperate it into action and arguement
        var qParse = function(cmd) {
            for(var i=0;i<cmd.length;i++){
                if(cmd.charAt(i) === " ") {
                    action = cmd.slice(0,i);
                    arguement = cmd.slice(i+1,cmd.length);
                    break;
                }
                else { action = cmd; arguement = "undefined"; }
            }
        };
	    //Parse q to determine the action and arguement
	    qParse(q);

	    //Display action in HTML
	    response.write("The parsed action is: " + action + "<br/><br/>");
	    response.write("The parsed arguement is: " + arguement + "<br/><br/>");
	    
	    //Prepare the query for wolfram
	    var question = action + " " + arguement;

	    //These are all of the actions Goddard understands
	    //Cassie! I goddard needs your help :) delete this comment when you're done
	    if(action === "say") response.write("Say!");
	    else if(action === "play"    || action === "Play")  response.write("Play!");
	    else if(action === "fetch"   || action === "Fetch")	response.write("Fetch!");
	    else if(action === "sleep"   || action === "Sleep")	response.write("Sleep!");
	    else if(action === "come"    || action === "Come")   response.write("Come!");
	    else if(action === "dance"   || action === "Dance")	response.write("Dance!");
	    else if(action === "what"    || action === "What")    wolfram.ask(question);
	    else if(action === "who"     || action === "Who")     wolfram.ask(question);
	    else if(action === "when"    || action === "When")    wolfram.ask(question);
	    else if(action === "where"   || action === "Where")	 wolfram.ask(question);
	    else if(action === "why"     || action === "Why")    response.write("Why?");
	    else if(action === "how"     || action === "How")    response.write("How?");
	    else if(action === "start"   || action === "Start")  response.write("Placeholder");
	    else if(action === "stop"    || action === "Stop")   response.write("This will eventually launch a function");
        else if(action === "tailwag" || action === "Tailwag") response.write("Tailwag!");
        else if(action === "speak"   || action === "Speak")   response.write("Speaking!");
        else if(action === "kiss"    || action === "Kiss")    response.write("Muah!");
        else if(action === "growl"   || action === "Growl")   response.write("Growl!");
        else if(action === "tunes"   || action === "Tunes")   response.write("Tunes!");
        else console.log("wut");

        response.end('<br/><br/>received fields:\n\n'+util.inspect(fields));
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
