var twit = require('twit');

var t = new twit({
    consumer_key:         '7WFBExWYwvAbJbZjnd972w'
  , consumer_secret:      'HjpEe9La7H58XwkyrWCV0uFjflrW96YjKg8WLyFppWQ'
  , access_token:         '2321453232-ogghxSrhJcTpnnpejFGqdV2ZYNmOH56tj5T5mdR'
  , access_token_secret:  'wCkEInEbOiNuPSy3tB6sN3bzxNKkaEvS6sXADIujLnnRg'
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