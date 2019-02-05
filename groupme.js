/* Author: Noah Yoshida
 *
 * This is a backend server that will digest commands sent to it from various
 * chat bots and return appropriate responses.
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use the body parser for each request
app.use(bodyParser.json());

// Listen on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// This gets pinged every time a message is sent in the chat
app.post('/groupme/callback', function (req, res) {
  console.log(req.body.text);
  let msg = req.body.text;
  if (msg.starsWith("!")) {
    msg.split(0, 0);
    console.log(msg);
  }
});

