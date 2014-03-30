//Logs a list of the actions goddard understands
exports.list = function show(){
    var actions = [];
    
    actions.push("help");
    actions.push("say");
    actions.push("play");
    actions.push("fetch");
    actions.push("sleep");
    actions.push("come");
    actions.push("dance");
    actions.push("what");
    actions.push("who");
    actions.push("when");
    actions.push("where");
    actions.push("why");
    actions.push("how");
    actions.push("start");
    actions.push("stop");
    actions.push("wag");
    actions.push("speak");
    actions.push("kiss");
    actions.push("growl");
    actions.push("get");
    actions.push("ls");
    actions.push("list");
    actions.push("kill");
    actions.push("bark");
    actions.push("bump");
    actions.push("tweet");
    actions.push("move");
    actions.push("go");
    actions.push("make");
    actions.push("translate");
    actions.push("roam");
    actions.push("wake");
    actions.push("scold");
    
    actions.sort();
    
    console.log("List of actions Goddard understands:\n" + actions);
};