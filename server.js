// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// OAUTH VERIFICATION
// =============================================================================
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://sendurr.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://sendurr.auth0.com/api/myworkflow/',
    issuer: "https://sendurr.auth0.com/",
    algorithms: ['RS256']
});

//app.use(jwtCheck);
// return error message for unauthorized requests
app.use(jwtCheck,function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message:'Missing or invalid token'});
    }
});

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