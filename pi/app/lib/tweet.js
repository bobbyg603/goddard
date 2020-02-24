var twit = require('twit');

var t = new twit({
    consumer_key:         '*'
  , consumer_secret:      '*'
  , access_token:         '*'
  , access_token_secret:  '*'
});

exports.newTweet = function tweet(words) {

    //For voice tweets, check for "at user" and replace with "@"
    
    //Tweet words from @unhgoddard
    console.log("Tweet: " + words);
    
    t.post('statuses/update', { status: words }, function(err, reply) {
      if(err) {console.log(err);}
      else console.log("Tweet posted successfully!");
    });

};
