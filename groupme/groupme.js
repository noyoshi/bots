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

var quotes = ["I̬̮̕ ̜A̧M͓ͅ ̷S̼̺͓ͅKY͕͎N̨̬̤͕E͕̞̳͈̻Ṯ̬̹", "h̵̠̀è̸̯͝l̷̹̓̍ĺ̷̲͍͗o̴̰̅ ̷̰͔̒̚w̵͈̿̋o̴̠͐r̷͈̫̔̾l̶̖̈̑d̶͕̩́"]; 

var movies = new Set([]);

var roasts = {
  general: ["Do you even have airpods?", 
    "I thought I heard something? No? Jack?", 
    "sudo kill -9 you"],
  bobbit: ["I hear Bobbit hearts his own posts", 
    "PHP? ...really?", 
    "Black and white nano is the best editor"],
  cfoley: ["Chris uses nano"],
  jmeyer: ["Black and white nano is the best editor"]
}

var getRand = (roasts) => {
  
  var rand = Math.random();
  rand *= roasts.length; 
  rand = Math.floor(rand);
  
  return roasts[rand];
}

var getMovies = (movies) => {
  var resp = "Movies in list: ";
  movies.forEach((item) => {
    resp += item + " ";
  });
  return resp;
}

var addMovie = (movies, newMovie) => {
  movies.add(newMovie);
}

var deleteMovie = (movies, oldMovie) => {
  movies.delete(oldMovie);
}

var parseMovie = (cmds) => {
  var movieString = '';
  cmds.forEach((item) => {
    movieString += item + ' ';
  });
  return movieString;
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
    let slices = msg.slice(1);
    let cmds = slices.split(" ");
    let cmd = cmds[0];
    console.log(cmd);
    switch(cmd) {
      case "weather": 
        // Weather
        getWeather(94301, 'us');
        break;
      case "roast":
        // Roast these fools
        let roastType = "general";
        if (cmds.length > 1) 
          roastType = cmds[1];

        postMessage(getRand(roasts[roastType]));
        break;
      case "random":
        postMessage(getRand(quotes));
        break;
      case "bobbit":
        postMessage(getRand(bobbits));
        break;
      case "cfoley":
        postMessage(getRand(chris));
        break;
      case "movies":
        postMessage(getMovies(movies));
        break;

      case "+movie":
        if (cmds.length > 1) {
          var movieName = parseMovie(cmds.slice(1));
          addMovie(movies, movieName);
          postMessage("Added movie: " + movieName);
        } else {
          postMessage("Pls give movie to add");
        }
        break;
      case "-movie":
        if (cmds.length > 1) {
          var movieName = parseMovie(cmds.slice(1));
          deleteMovie(movies, movieName);
          postMessage("Removed movie: " + movieName);
        } else {
          postMessage("Pls give movie to delete");
        }
        break;
      default: 
        console.log("Invalid command!");
    }
  }
});

