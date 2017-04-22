//db connect
//var monk = require('monk');
//var db = monk('localhost:27017/nodetest1');
var mongoose = require('mongoose');
var dbURI = "mongodb://localhost:27017/myworkflow_DB";
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});


module.exports.mongoose = mongoose;