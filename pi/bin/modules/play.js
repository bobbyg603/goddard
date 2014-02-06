var exec = require("child_process").exec;

exports.lookup = function lookup(song) {
    
    //var cmd = "mpg123 " + song;
    var cmd = "cd ./pi/bin/media && mpg123 " + song;
    
    exec(cmd,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
};