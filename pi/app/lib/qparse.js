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
    
    //Create a question to send to wolfram
    question = action + " " + argument;
    
    //These are all of the Primary actions Goddard understands
    if(action === "help"        || action === "Help")   help.list(); // Needs to be sent to client
    else if(action === "status" || action === "Status") console.log("Status?");
    else if(action === "sleep"  || action === "Sleep")	play.lookup("sleep.mp3","");
    else if(action === "stop"   || action === "Stop")   stop.program(argument);
    
    else if(action === "come"   || action === "Come")   console.log("Come!");
    else if(action === "here"   || action === "Here")   console.log("Here!"); // workaround for annyange come bug
    else if(action === "dance"  || action === "Dance")	play.lookup("dance.mp3","/dj");
    else if(action === "dj"     || action === "DJ" )    play.pickRandomSong("dj");
    else if(action === "bump"   || action === "Bump")   play.pickRandomSong("bump");
    
    else if(action === "wag"    || action === "Wag")    console.log("WagWag!");
    else if(action === "bark"   || action === "Bark")   play.lookup("bark.mp3","");
    else if(action === "growl"  || action === "Growl")  play.lookup("growl.mp3","");
    else if(action === "roam"   || action === "Roam")   console.log("Roaming!");
    
    //Goddard uses WolframAlpha to answer questions
    else if(action === "who"    || action === "Who")    wolfram.ask(question);
    else if(action === "what"   || action === "What")   wolfram.ask(question);
    else if(action === "when"   || action === "When")   wolfram.ask(question);
    else if(action === "where"  || action === "Where")	wolfram.ask(question);
    else if(action === "why"    || action === "Why")    wolfram.ask(question);
    else if(action === "how"    || action === "How")    wolfram.ask(question);
    
    //This is how Goddard talks
    else if(action === "say"    || action === "Say")    speak.say(argument);
    
    //This is how Goddard tweets
    else if(action === "tweet"  || action === "Tweet")  tweet.newTweet(argument);
    
    //This is how Goddard translates
    else if(action === "translate" || action === "Translate") ;
    
    //These are the Secondary actions Goddard understands
    else if(action === "play"   || action === "Play")   play.lookup(argument,"");
    else if(action === "fetch"  || action === "Fetch")	console.log("Fetch!");
    else if(action === "start"  || action === "Start")  console.log("Start!");
    else if(action === "kill"   || action === "Kill")   stop.program(argument);
    else if(action === "speak"  || action === "Speak")  play.lookup("bark.mp3","");
    else if(action === "kiss"   || action === "Kiss")   play.lookup("kiss.mp3","");
    else if(action === "move"   || action === "Move")   console.log("Move!");
    else if(action === "go"     || action === "Go")     console.log("Go!"); //Do the same as move
    else if(action === "scold"  || action === "Scold")  speak.say("I'm sorry!");
    else if(action === "make"   || action === "Make")   make.make(argument);
    else if(action === "wake"   || action === "Wake")   console.log("I'm awake!");
    
    //Old commands - used for debug
    //else if(action === "get"    || action === "Get")    console.log(ls.files(argument));
    //else if(action === "ls"     || action === "Ls")     console.log(ls.files(argument));
    //else if(action === "list"   || action === "List")   console.log(ls.files(argument));
    else speak.say("Sorry, I don't understand your command");
};

exports.ReturnSerialCode = function ReturnSerialCode(action) {
    switch(action){

        //Return a value to write to the arduino based on a button action
        case "status": return "0";
        case "sleep": return null;
        case "stop" : return "1";
        case "come" : return "2";
        case "here boy": return "2"; // fixes bug - annyang registers come as c** - yikes
        case "dance": return "3";
        case "dj"   : return "4";
        case "DJ"   : return "4"; // fixes bug caused by annyang
        case "bump" : return "4";
        case "wag"  : return "5";
        case "roam" : return "6";
        case "sniff": return "7";
        case "scold": return "8";
        
        
        //Return a value to write to the arduino based on a direction press
        case "NW": return "A";
        case "N" : return "N";
        case "NE": return "B";
        case "E" : return "E";
        case "W" : return "W";
        case "SW": return "C";
        case "S" : return "S";
        case "SE": return "D";
        
        //Events that don't require arduino interaction;
        default: return null;
    }  
};