//Takes the speech recognition text and decides what action to perform

//Goddard Modules
var wolfram =   require('./wolfram.js');
var speak =     require('./speak.js');
var play =      require('./play.js');
var help =      require('./help.js');
var stop =      require('./stop.js');
var ls =        require('./ls.js');
var make =      require('./make.js');
var tweet =     require('./tweet.js');

exports.parse = function parse(cmd) {
    //Declare variables
    var action = "";
    var argument = "";
    var question = "";
    
    //First word in cmd => action, everything else => argument
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
    
    //These are all of the actions Goddard understands
    if(action === "help"   || action === "Help")        help.list();
    else if(action === "say"    || action === "Say")    speak.say(argument);
    else if(action === "play"   || action === "Play")   play.lookup(argument,"");
    else if(action === "bump"   || action === "Bump")   play.pickRandomSong("bump");
    else if(action === "fetch"  || action === "Fetch")	console.log("Fetch!");
    else if(action === "sleep"  || action === "Sleep")	play.lookup("sleep.mp3","");
    else if(action === "come"   || action === "Come")   console.log("Come!");
    else if(action === "dance"  || action === "Dance")	play.lookup("dance.mp3","/dj");
    else if(action === "dj"     || action === "DJ" )    play.pickRandomSong("dj");
    else if(action === "what"   || action === "What")   wolfram.ask(question);
    else if(action === "who"    || action === "Who")    wolfram.ask(question);
    else if(action === "when"   || action === "When")   wolfram.ask(question);
    else if(action === "where"  || action === "Where")	wolfram.ask(question);
    else if(action === "why"    || action === "Why")    wolfram.ask(question);
    else if(action === "how"    || action === "How")    wolfram.ask(question);
    else if(action === "start"  || action === "Start")  console.log("Start!");
    else if(action === "stop"   || action === "Stop")   stop.program(argument);
    else if(action === "kill"   || action === "Kill")   stop.program(argument);
    else if(action === "wag"    || action === "Wag")    console.log("WagWag!");
    else if(action === "speak"  || action === "Speak")  play.lookup("bark.mp3","");
    else if(action === "kiss"   || action === "Kiss")   play.lookup("kiss.mp3","");
    else if(action === "growl"  || action === "Growl")  play.lookup("growl.mp3","");
    else if(action === "bark"   || action === "Bark")   play.lookup("bark.mp3","");
    else if(action === "get"    || action === "Get")    console.log(ls.files(argument));
    else if(action === "ls"     || action === "Ls")     console.log(ls.files(argument));
    else if(action === "list"   || action === "List")   console.log(ls.files(argument));
    else if(action === "tweet"  || action === "Tweet")  tweet.newTweet(argument);
    else if(action === "move"   || action === "Move")   console.log("Move!");
    else if(action === "go"     || action === "Go")     console.log("Go!"); //Do the same as move
    else if(action === "scold"  || action === "Scold")  speak.say("I'm sorry!");
    else if(action === "make"   || action === "Make")   make.make(argument);
    else if(action === "roam"   || action === "Roam")   console.log("Roaming!");
    else if(action === "wake"   || action === "Wake")   console.log("I'm awake!");
    else if(action === "status" || action === "Status") console.log("Status?");
    else if(action === "translate" || action === "Translate") ;
    else speak.say("Sorry, I don't understand your command");
};

exports.ReturnSerialCode = function ReturnSerialCode(btnCode) {
    switch(btnCode){
        //Events that require a serialPort.write();
        case "come" : return "0";
        case "fetch": return "1";
        case "move1": return "2";
        case "move2": return "2";
        case "sleep": return "3";
        case "wake" : return "4";
        case "roam" : return "5";
        case "stop" : return "6";
        case "status": return "7";
        case "scold": return "8";
        case "wag"  : return "9";
        case "dance": return "10";
        case "bump" : return "11";
        
        //Events that don't require a serialPort.write();
        //case "stop audio" : return null;
        case "dj"   : return null;
        case "help" : return null;
        case "bark" : return null;
        case "growl": return null;
        default: return null;
    }  
};