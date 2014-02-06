var exec = require("child_process").exec;

exports.lookup = function lookup(song) {
    
    //var cmd = "ls";
    var cmd = "cd ../media && mpg123 " + song;  

    exec(cmd,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
};
