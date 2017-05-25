

var express  = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port     = process.env.PORT || 8888;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var configDB = require('./config/database.js');
var qparse = require('./app/lib/qparse.js');
var serialPortEnabled = false;

// arduino serial connection via usb
if(serialPortEnabled)
{
  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600
  });
  
  var serialDataOut = '9';
  
  serialPort.on("open", function () {
    console.log('serialport open');
  });
}

// connect to database
mongoose.connect(configDB.url);

// authenticate routes
require('./config/passport')(passport);

// configure app
app.configure(function() {
  
  // configure view controller
	console.log("trying to configure app...");
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
    
  // configure view
  console.log(__dirname);
  app.set('views', __dirname + '/views'); 
	app.set('view engine', 'ejs'); 
  app.use('/public', express.static(__dirname + "/public"));

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
});

// configure routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch
server.listen(port);
console.log('The magic happens on port ' + port);

// subscribe to web app events
io.sockets.on('connection', function(socket) {
  socket.emit('news', "hello from the server!");
  
  // subscribe to annyang voice transcriptions from the web app
  socket.on('voice data', function(data) {
    console.log("new voice instruction received!")
    console.log(">> " + data);
    qparse.parse(data); // TODO BG fix god function
  });
  
  // subscribe to button presses from the web app
  socket.on('button data', function(btn) {
    console.log("new button instruction received!")
    console.log(">> " + btn);
    qparse.parse(btn); // TODO BG fix god function
    
    // send the command to the arduino
    if (serialPortEnabled)
    {
      // determine what code needs to be sent to the arduino
      serialDataOut = qparse.ReturnSerialCode(btn);
    
      // write to the arduino if there is data to write
      if(serialDataOut !== null)  {  
        serialPort.write(new Buffer(serialDataOut,'ascii'), function(err, results) {
          console.log('sent '+ serialDataOut);
          console.log('err ' + err);
          console.log('results ' + results);
        });
      }
    }
  });
  
  // TODO BG what is this?
  socket.on('status', function(status) {
    console.log("new status received!")
    console.log(">> " + status);
  });
});

