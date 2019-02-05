/* Author: Noah Yoshida
 *
 * This is a backend server that will digest commands sent to it from various
 * chat bots and return appropriate responses.
 */

const express = require('express');
const bodyParser = require('body-parser');
const HTTPS = require('https');
const app = express();

// Get the BotID from the evniornment variable
var botID = process.env.BOT_ID;

function postMessage(msg) {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : msg 
  };

  console.log('sending ' + botResponse + ' to ' + botID);

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

// Use the body parser for each request
app.use(bodyParser.json());

// Listen on port 3001
app.listen(3001, () => {
  console.log("Listening on port 3001");
});

// This gets pinged every time a message is sent in the chat
app.post('/', function (req, res) {
  // console.log(req);
  console.log(req.body.text);
  let msg = req.body.text;
  if (msg.startsWith("!")) {
    let cmd = msg.slice(1);
    console.log(cmd);
    postMessage("Command received!"); 
  }
});

