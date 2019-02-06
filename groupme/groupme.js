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

var roasts = ["Do you even have airpods?", "I thought I heard something? No? Jack?", "sudo kill -9 you"];
var quotes = ["I̬̮̕ ̜A̧M͓ͅ ̷S̼̺͓ͅKY͕͎N̨̬̤͕E͕̞̳͈̻Ṯ̬̹", "h̵̠̀è̸̯͝l̷̹̓̍ĺ̷̲͍͗o̴̰̅ ̷̰͔̒̚w̵͈̿̋o̴̠͐r̷͈̫̔̾l̶̖̈̑d̶͕̩́"]; 


var bobbits = ["I hear Bobbit hearts his own posts", "PHP? ...really?"];

var getRand = (roasts) => {
  
  var rand = Math.random();
  rand *= roasts.length; 
  rand = Math.floor(rand);
  
  return roasts[rand];
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
    switch(cmd) {
      case "weather": 
        // Weather
        getWeather(94301, 'us');
        break;
      case "roast":
        postMessage(getRand(roasts));
        break;
      case "random":
        postMessage(getRand(quotes));
        break;
      case "bobbit":
        postMessage(getRand(bobbits));
      default: 
        console.log("Invalid command!");
    }
  }
});

