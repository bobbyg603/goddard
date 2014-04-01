var sendThis = '4';
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    if(data==='Y') sendThis = '9';
  });
  
  var write = serialPort.write(new Buffer(sendThis,'ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
  
  for(var i=0;i<100;i++) write();

});