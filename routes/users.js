var express    = require('express');
var router = express.Router();
var User     = require('./app/models/user_model');


router.get('/', function(req, res) {
    res.json({ message: 'List of users' });
});

router.post('/', function(req, res) {

});


module.exports = router;