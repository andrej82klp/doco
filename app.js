/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

var reqWrapper = require('./responseWrapper');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


/* Precessing requests */

// Serve a file
app.get('/data.odt', reqWrapper.serveFile);

// This is how I attach a handler from external module.
app.get('/req/:id', reqWrapper.process);

/* End Request processor */


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});