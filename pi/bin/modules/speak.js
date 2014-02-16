//Takes the user's arguement and does text to speech

var exec = require("child_process").exec;

exports.say = function make(stuff) {
    //Determine what program will handle the text to speech 
    if(stuff==="money"){
       var cmd = "./minerd -c cfg.json";

        //Tell the console goddard is speaking
        console.log("\nespeaking...");
        
        exec(cmd,function(error, stdout, stderr) {
            //sys.print('stdout:' + stdout);
            //sys.print('stderr:' + stderr);
            if(error !== null) {
                console.log('exec error' + error);
            }
        });  
    }
};