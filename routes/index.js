var express    = require('express');
var router = express.Router();              // get an instance of the express Router


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


module.exports = router;