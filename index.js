/* 
* Robert Galli
* The Goddard Project
* 10.29.2013 
*/

var server = require("./bin/server");
var router = require("./bin/router");
var requestHandlers = require("./bin/requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
