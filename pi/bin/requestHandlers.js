//Node Modules
var util = require("util");
var fs = require("fs");
var formidable = require("formidable");

//Goddard Modules
var wolfram =   require('./modules/wolfram.js');
var speak =     require('./modules/speak.js');
var play =      require('./modules/play.js');
var help =      require('./modules/help.js');
var stop =      require('./modules/stop.js');
var ls =        require('./modules/ls.js');
var make =      require('./modules/make.js');
var tweet =     require('./modules/tweet.js');


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
	'<h2>upload file</h2>' +
	'<form action="/upload" enctype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" multiple="multiple"><br/>' +
	'<input type="submit" value="Upload file" />' +
	'</form>' +
	'<h2>text command</h2>' +
	'type help for a list of commands<br/>' +
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
	console.log("About to parse...");

	form.parse(request, function(error, fields, files) {
		console.log("parsing done.");
		
		fs.rename(files.upload.path, "/tmp/voice.m4a", function(error) {
			if (error) {
				fs.unlink("/tmp/voice.m4a");
				fs.rename(files.upload.path, "/tmp/voice.m4a");
			}
		});
	
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("Recieved image:<br/>");
		response.write("<embed src='/show' />");
		response.end();
	});
}

function cmd(response, request) {
    //Set up variables to parse text command
    var form = new formidable.IncomingForm();
    var fields = [];
    var q = "";
    var action = "";
    var argument = "";
    
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
            
            //Set the input and log
            q = fields[0][1];
            console.log("fields: " +q);
            response.write("You've sent the command: " + q +"<br/><br/>");

            //Take input and seperate it into action and argument
            var qParse = function(cmd) {
                for(var i=0;i<cmd.length;i++){
                    if(cmd.charAt(i) === " ") {
                        action = cmd.slice(0,i);
                        argument = cmd.slice(i+1,cmd.length);
                        break;
                    }
                    else { action = cmd; argument = "undefined"; }
                }
            };
            //Parse q to determine the action and argument
            qParse(q);
    
            //Display action in HTML
            response.write("The parsed action is: " + action + "<br/><br/>");
            response.write("The parsed argument is: " + argument + "<br/><br/>");
            
            //Prepare the query for wolfram
            var question = action + " " + argument;
    
            //These are all of the actions Goddard understands
                 if(action === "help"   || action === "Help")   help.list();
            else if(action === "say"    || action === "Say")    speak.say(argument);
            else if(action === "play"   || action === "Play")   play.lookup(argument);
            else if(action === "bump"   || action === "Bump")   play.lookup("HipHop.mp3");
            else if(action === "fetch"  || action === "Fetch")	response.write("Fetch!");
            else if(action === "sleep"  || action === "Sleep")	play.lookup("sleep.mp3");
            else if(action === "come"   || action === "Come")   response.write("Come!");
            else if(action === "dance"  || action === "Dance")	play.lookup("dance.mp3");
            else if(action === "what"   || action === "What")   wolfram.ask(question);
            else if(action === "who"    || action === "Who")    wolfram.ask(question);
            else if(action === "when"   || action === "When")   wolfram.ask(question);
            else if(action === "where"  || action === "Where")	wolfram.ask(question);
            else if(action === "why"    || action === "Why")    wolfram.ask(question);
            else if(action === "how"    || action === "How")    wolfram.ask(question);
            else if(action === "start"  || action === "Start")  response.write("Start!");
            else if(action === "stop"   || action === "Stop")   stop.program(argument);
            else if(action === "kill"   || action === "Kill")   stop.program(argument);
            else if(action === "wag"    || action === "Wag")    response.write("WagWag!");
            else if(action === "speak"  || action === "Speak")  play.lookup("bark.mp3");
            else if(action === "kiss"   || action === "Kiss")   play.lookup("kiss.mp3");
            else if(action === "growl"  || action === "Growl")  play.lookup("growl.mp3");
            else if(action === "bark"   || action === "Bark")   play.lookup("bark.mp3");
            else if(action === "get"    || action === "Get")    response.write(ls.files(argument));    //doesn't work - needs a callback
            else if(action === "ls"     || action === "Ls")     response.write(ls.files(argument));    //doesn't work - needs a callback
            else if(action === "list"   || action === "List")   response.write(ls.files(argument));    //doesn't work - needs a callback
            else if(action === "tweet"  || action === "Tweet")  tweet.newTweet(argument);
            else if(action === "move"   || action === "Move")   response.write("Move!");
            else if(action === "go"     || action === "Go")     response.write("Go!");
            else if(action === "scold"  || action === "Scold")  speak.say("I'm sorry!");
            else if(action === "make"   || action === "Make")   make.make(argument);
            else if(action === "translate" || action === "Translate") ;
            else speak.say("Sorry, I don't understand your command");
    
            response.end('<br/>received fields:\n\n'+util.inspect(fields)+'<br/><button type="button" onclick="history.go(-2);">Again!</button>');
            //need to add code to cancel the current request
            //need to add code to start a new request
        });
    form.parse(request);
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type" : "audio/mpeg"});
	fs.createReadStream("/tmp/voice.m4a").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.cmd = cmd;
