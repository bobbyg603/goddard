// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var configDB = require('./config/database.js');

// serial communications init
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});
var serialDataOut = '9';

serialPort.on("open", function () {
  console.log('serialport open');
});

//bobby's code library
var qparse = require('./app/lib/qparse.js');
console.log("finished requires");


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
	console.log("trying to configure app...");
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
    

    app.set('views', __dirname + '/views'); //overwrite the default /views location
	app.set('view engine', 'ejs'); // set up ejs for templating
    
    app.use('/public', express.static(__dirname + "/public"));
    
    console.log(__dirname);
	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	console.log("done configuring app...");
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
//app.listen(port);
//server.listen(process.env.PORT);

server.listen(8888);
console.log('The magic happens on port ' + port);

// socket.io ===================================================================
io.sockets.on('connection', function (socket) {
  socket.emit('news', "hello from the server!");
  socket.on('voice data', function (data) {
    console.log(">> " + data);
    qparse.parse(data);
  });
  socket.on('button data', function(btn) {
    console.log(">> " +btn);
    serialPort.write(new Buffer(serialDataOut,'ascii'), function(err, results) {
        console.log('sent '+ serialDataOut);
        console.log('err ' + err);
        console.log('results ' + results);
        qparse(btn);
    });
  });
  socket.on('status', function(status) {
    console.log(">> " + status);
  });
});
