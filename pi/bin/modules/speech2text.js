//Converts phone audio to wav, sends wav to google, returns string
var exec = require("child_process").exec;

exports.convert = function convert(file) {
    
    //TODO
    //Create a global variable that holds the home directory (homedir)
    //Change file to "homedir/bin/tmp/" + file below
    //Change voice.wav to homedir/bin/tmp/voice.wav below
    
    //Use ffmpeg to convert .m4a to .wav
    var cmd = "ffmpeg -i " + file + " voice.wav";  

    exec(cmd,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
    
    //Send the converted file to google for parsing
    var cmd2 = "ParseSpeech.sh";
    
    exec(cmd2,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
    
    //Get the parsed text string
    var cmd3 = "";
    
    exec(cmd3,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });

    //Return the parsed text string
};
