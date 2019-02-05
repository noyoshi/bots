/* Author: Noah Yoshida
 *
 * This is a backend server that will digest commands sent to it from various
 * chat bots and return appropriate responses.
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dummyFunc = () => {
  console.log("i am a dummy func");
};

// Use the body parser for each request
app.use(bodyParser.json());

// Listen on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get('/', function (req, res) {
  dummyFunc();
  res.send('{"id": "hello world"}')
});

app.get('/bot/groupme', function (req, res) {
  console.log("Groupme", req);
});

// Recieves a command from a bot with an id, and a command with a cid
app.get('/bot/:id/command/:cid', function (req, res) {
  res.send(req.params)
})
