//Takes the speech recognition text and decides what action to perform

//Goddard Modules
var wolfram =   require('./wolfram.js');
var speak =     require('./speak.js');
var play =      require('./play.js');
var help =      require('./help.js');
var stop =      require('./stop.js');
var make =      require('./make.js');
var tweet =     require('./tweet.js');
//var ls =        require('./ls.js');

exports.parse = function parse(cmd) {
    
    //Declare variables
    var action = "";
    var argument = "";
    var question = "";
    
    //action = first word in cmd, argument = everything else
    for(var i=0;i<cmd.length;i++){
        if(cmd.charAt(i) === " ") {
            action = cmd.slice(0,i);
            argument = cmd.slice(i+1,cmd.length);
            break;
        }
        else { action = cmd; argument = "undefined"; }
    }
    
    //Make action lower case to make the logic block easier to manage
    action = action.toLowerCase();
    
    //Create a question to send to wolfram
    question = action + " " + argument;
    
    //These are all of the primary actions Goddard understands
    if(action === "help")           help.list(); // Needs to be sent to client
    else if(action === "scold")     play.lookup("wimper.mp3","");
    else if(action === "sleep")     play.lookup("sleep.mp3","");
    else if(action === "stop")      stop.program(argument);
    
    else if(action === "roam")      console.log("Roaming!");
    else if(action === "dance")     play.lookup("dance.mp3","/dj");
    else if(action === "dj")        play.pickRandomSong("dj");
    else if(action === "bump")      play.pickRandomSong("bump");
    
    else if(action === "wag")       play.lookup("pant.mp3","");
    else if(action === "bark")      play.lookup("bark.mp3","");
    else if(action === "growl")     play.lookup("growl.mp3","");
    else if(action === "sniff")     play.lookup("sniff.mp3","");
   
    //Goddard uses WolframAlpha to answer questions
    else if(action === "who")       wolfram.ask(question);
    else if(action === "what")      wolfram.ask(question);
    else if(action === "when")      wolfram.ask(question);
    else if(action === "where")     wolfram.ask(question);
    else if(action === "why")       wolfram.ask(question);
    else if(action === "how")       wolfram.ask(question);
    
    //This is how Goddard talks
    else if(action === "say")       speak.say(argument);
    
    //This is how Goddard tweets
    else if(action === "tweet")     tweet.newTweet(argument);
    
    //This is how Goddard translates
    else if(action === "translate") console.log("Not implemented!");
    
    //These are the Secondary actions Goddard understands
    else if(action === "play")      play.lookup(argument,"");
    else if(action === "fetch")     console.log("Fetch!");
    else if(action === "start")     console.log("Start!");
    else if(action === "kill")      stop.program(argument);
    else if(action === "speak")     play.lookup("bark.mp3","");
    else if(action === "kiss")      play.lookup("kiss.mp3","");
    else if(action === "move")      console.log("Move!");
    else if(action === "go")        console.log("Go!"); //Do the same as move
    else if(action === "make")      make.make(argument);
    else if(action === "wake")      console.log("I'm awake!");
    else if(action === "bad")       play.lookup("wimper.mp3","");    
    else if(action === "good")      play.lookup("pant.mp3","");

    //Ignore the directional stuff
    else if(action === "n" || action === "e" || action === "s" || action === "w" || action === "ne" || action === "nw" || action === "se" || action === "sw");
    //Old commands - used for debug
    //else if(action === "here"   || action === "Here")   console.log("Here!"); // workaround for annyange come bug
    //else if(action === "come"   || action === "Come")   console.log("Come!");
    //else if(action === "status" || action === "Status") console.log("Status?");
    //else if(action === "get"    || action === "Get")    console.log(ls.files(argument));
    //else if(action === "ls"     || action === "Ls")     console.log(ls.files(argument));
    //else if(action === "list"   || action === "List")   console.log(ls.files(argument));
    else speak.say("Sorry, I don't understand your command");
};

exports.ReturnSerialCode = function ReturnSerialCode(action) {
    
    switch(action){

        //Return a value to write to the arduino based on a button action
        case "status": return "0";
        case "sleep": return "7";
        case "stop" : return "1";
        //case "come" : return "2";
        //case "here boy": return "2"; // fixes bug - annyang registers come as c** - yikes
        //case "here" : return "2"; // fixes bug - annyang registers come as c** - yikes
        case "dance": return "3";
        case "dj"   : return "4";
        case "DJ"   : return "4"; // fixes bug caused by annyang
        case "bump" : return "4";
        case "wag"  : return "5";
        case "roam" : return "6";
        case "sniff": return "7";
        case "scold": return "8";
        case "wake" : return "9";
    
        //Misc
        case "bad" : return "8";
        case "bad boy" : return "8";
        case "bad dog" : return "8";
        case "good" : return "5";
        case "good dog" : return "5";
        case "good boy" : return "5";        
        
        //Return a value to write to the arduino based on a direction press
        case "nw": return "A";
        case "n" : return "N";
        case "ne": return "B";
        case "e" : return "E";
        case "w" : return "W";
        case "sw": return "C";
        case "s" : return "S";
        case "se": return "D";
        
        //Events that don't require arduino interaction;
        default: return null;
    }  
};
