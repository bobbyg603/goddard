var success;
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
	success=data;
    });
    for(var i=0;i<100;i++){
    	serialPort.write(new Buffer("4", 'ascii'), function(err, results) {
        	if(err!=undefined)   console.log('err ' + err);
		// callback code here
    	});
    if(success=='Y') break; 
   }
});
