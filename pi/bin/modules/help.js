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
    
    actions.sort();
    
    console.log("List of actions Goddard understands:\n" + actions);
};