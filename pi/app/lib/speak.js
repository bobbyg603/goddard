//Takes the user's arguement and does text to speech
var exec = require("child_process").exec;

exports.say = function speak(words) {
    //Determine what program will handle the text to speech 
    var speaknow = "espeak -f stt.txt --stdout | aplay";

    //Espeak Fix - writes to text file, reads from text, deletes file
    var create = "touch stt.txt && echo '" + words + "' >> stt.txt";
    var del = function(){exec("rm stt.txt",function(err,stdo,stde){console.log(del);});};

    //Tell the console goddard is speaking
    console.log("\nespeaking...");
    
    //Execute the linux commands
    exec(create,function(err,stdo,stde){console.log(create);});

    exec(speaknow,function(error, stdout, stderr) {
		//sys.print('stdout:' + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
	    //Delete the leftover stt.txt file after speak is done
        setTimeout(del(),20000);
   });
};
