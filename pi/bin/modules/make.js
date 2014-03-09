//Determine what the user wants Goddard to make
var exec = require("child_process").exec;

exports.make = function make(stuff) {
    //Determine what program will handle the text to speech 
    if(stuff==="music");    //Generate midi file
    if(stuff==="love") ;    //Play baby making music, hump something
    if(stuff==="money"){
       var cmd = "./minerd -c cfg.json";

        //Tell the console goddard is speaking
        console.log("\nWow. Such Coin. Much Doge");
        
        exec(cmd,function(error, stdout, stderr) {
            //sys.print('stdout:' + stdout);
            //sys.print('stderr:' + stderr);
            if(error !== null) {
                console.log('exec error' + error);
            }
        });  
    }
};