var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var serialDataOut = '9';

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('serial data received: ' + data);
  });
  
serialPort.write(new Buffer(serialDataOut,'ascii'), function(err, results) {
    console.log('sent '+ serialDataOut);
    console.log('err ' + err);
    console.log('results ' + results);
  });
});