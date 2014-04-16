//Takes the user's arguement and does text to speech
var exec = require("child_process").exec;

exports.say = function speak(words) {
    //Determine what program will handle the text to speech 
    var saywords = "echo'"+words+"' | festival --tts";

    exec(saywords,function(error, stdout, stderr) {
		//sys.print('stdout:' + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
   });
};
