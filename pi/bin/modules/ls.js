//Takes the user's arguement and prints a list of files in that directory

var exec = require("child_process").exec;

exports.files = function lookup(folder) {
    
    var cmd = "cd ./pi/bin/" + folder +" && ls";
    var out = "";
    
    exec(cmd,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
            out = error;
        } else out = "Files in directory " + folder + ":\n" +stdout;
    });
    return out;
};