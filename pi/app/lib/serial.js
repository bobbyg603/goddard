var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  serialPort.write(new Buffer("4",'ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});