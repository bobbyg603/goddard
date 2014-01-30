var exec = require("child_process").exec;

exports.say = function speak(words) {
    var cmd = "espeak \"" + words + "\"";
    console.log(cmd);
    exec(cmd,function(error, stdout, stderr) {
		//sys.print('stdout:' + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
};