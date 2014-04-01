var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort('/dev/ttyACM0', 
    {   baudrate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
    });

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log('data received: ' + data);
        });
    serialPort.write(9, function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
        });
});
