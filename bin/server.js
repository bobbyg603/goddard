var util = require('util'),
http = require('http'),
url = require('url');


function start(route) {

	function onRequest (request, response) {

		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + "  recieved.");
		
		route(pathname);

		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('hello, i know nodejitsu.')
		response.end();

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started on port 8888");

}

exports.start = start;
