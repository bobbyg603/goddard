//Takes the user's arguement and does text to speech
var exec = require("child_process").exec;

exports.say = function speak(words) {
    //Determine what program will handle the text to speech 
    var saywords = "espeak '" +words+ "'";

    exec(saywords,function(error, stdout, stderr) {
		console.log(stdout);
        if(error !== null) {
            console.log('exec error' + error);
        }
   });
};
