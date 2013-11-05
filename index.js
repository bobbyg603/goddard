/* 
* Robert Galli
* The Goddard Project
* 10.29.2013 
*/

var server = require("./bin/server");
var router = require("./bin/router");

server.start(router.route);
