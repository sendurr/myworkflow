// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let `us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// DB SETUP
// =============================================================================
var mongoose = require('./db/dbconfig').mongoose;

// ROUTE PATHS
// =============================================================================
var index = require('./routes/index');
var users = require('./routes/users');


// REGISTER OUR ROUTES
// ============================================================================
app.use('/', index);
app.use('/users', users);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);