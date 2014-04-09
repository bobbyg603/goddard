//Takes the user's arguement looks for a matching song, then plays it

var exec = require("child_process").exec;
var play =      require('./play.js');
var stop =      require('./stop.js');

exports.lookup = function lookup(song,playlist) {

    //Map numbers to playlist songs
    if (playlist==="/dj") {
        if(song==1) song = "Animals.mp3";
        if(song==2) song = "Badinga.mp3";
        if(song==3) song = "BigPappa.mp3";
        if(song==4) song = "InDaClub.mp3";
        if(song==5) song = "PursuitOfHappiness.mp3";
        if(song==6) song = "Selfie.mp3";
        if(song==7) song = "Skrillex.mp3";
        if(song==8) song = "TurnDownForWhat.mp3";
        if(song==9) song = "WakeMeUp.mp3";
    }
    if (playlist==="/bump") {
        if(song==1) song = "AnteUp.mp3";
        if(song==2) song = "HipHop.mp3";
        if(song==3) song = "MoneyTrees.mp3";
        if(song==4) song = "SoFly.mp3";
        if(song==5) song = "StillDre.mp3";
        if(song==6) song = "TheRed.mp3";
        if(song==7) song = "WhatsTheDifference.mp3";
        if(song==8) song = "Xxplosive.mp3";
        if(song==9) song = "GCode.mp3";
    }
    
    //Stop whatever is already playing
    stop.program("audio");
    
    var cmd = "cd ./bin/media" + playlist + " && mpg321 " + song;  

    exec(cmd,function(error, stdout, stderr) {
		//Get the directory listing
		console.log("stdout: " + stdout);
        //sys.print('stderr:' + stderr);
        if(error !== null) {
            console.log('exec error' + error);
        }
    });
};

exports.pickRandomSong = function pickRandomSong(playlist){
    var song = Math.floor((Math.random()*9)+1);
    if(playlist==="dj") play.lookup(song,"/dj");
    if(playlist==="bump") play.lookup(song,"/bump");
};
