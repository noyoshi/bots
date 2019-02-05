var HTTPS = require('https');
var postMessage = require('./post_message').postMessage

// Get the weather token
var weatherToken = process.env.WEATHER_KEY;

function getWeather(zip, country) {
  var options, req, data;
  let path = '/data/2.5/weather?zip=' + zip + ',' + country;
  path = path + '&APPID=' + weatherToken;
  console.log(path); 
  options = {
    hostname: 'api.openweathermap.org',
    path: path, 
    method: 'GET'
  };

  var body = '';
  req = HTTPS.request(options, function(res) {
    if(res.statusCode == 202 || res.statusCode == 200) {
      // Valid response
      
      // Read in data
      res.on('data', (chunk) => {
        body += chunk;
      });

      // Data is done
      res.on('end', () => {
        console.log(body);
        postMessage(body);
      });

    } else {
      console.log('rejecting bad status code ' + res.statusCode);
    }
  });

  // Handle error
  req.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  // Handle timeout?
  req.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  // IDK
  req.end(JSON.stringify(body));
}

console.log(getWeather(94301, 'us'));
exports.getWeather = getWeather
