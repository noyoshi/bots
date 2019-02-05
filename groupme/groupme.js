/* Author: Noah Yoshida
 *
 * This is the groupme node bot
 */

const express = require('express');
const bodyParser = require('body-parser');
const HTTPS = require('https');
const app = express();

const getWeather = require('./weather').getWeather

// Message posting func
var postMessage = require('./post_message').postMessage

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
    switch(cmd) {
      case "weather": 
        // Weather
        getWeather(94301, 'us');
        break;
      default: 
        console.log("Invalid command!");
    }
  }
});

