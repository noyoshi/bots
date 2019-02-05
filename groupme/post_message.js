var HTTPS = require('https');

// Get the BotID from the evniornment variable
var botID = process.env.BOT_ID;

function postMessage(msg) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : msg
  };

  console.log('sending ' + msg + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
    if(res.statusCode == 202) {
      //neat
    } else {
      console.log('rejecting bad status code ' + res.statusCode);
    }
  });

  // Handle error
  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  // Handle timeout?
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  // IDK
  botReq.end(JSON.stringify(body));
}

export.postMessage = postMessage
