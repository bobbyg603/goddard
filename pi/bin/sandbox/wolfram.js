var wolfram = require('wolfram').createClient("2P3U5X-5YLPLVYPJH");

wolfram.query("8+1", function(err, result) {
  if(err) throw err;
  
  var newResult = result[0].subpods[0].value +" | "+ result[1].subpods[0].value;
  //console.log("Result: %j", result);
  //console.log("\n");
  
  console.log(newResult);
})
