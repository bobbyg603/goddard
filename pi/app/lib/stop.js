//Takes the user's arguement and uses it to stop a running task

var exec = require("child_process").exec;

exports.program = function kill(program) {
    
    //var cmd = "ls";
    if(program == "audio") program = "mpg321";    

    if(program !== "node" && program !== "Node") {
        var cmd = "killall " + program;
        
        exec(cmd,function(error, stdout, stderr) {
            //Get the directory listing
            console.log("stdout: " + stdout);
            //sys.print('stderr:' + stderr);
            if(error !== null) {
                console.log('exec error' + error);
            }
        });
    } else console.log("nice try haxor");
};
