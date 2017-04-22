var express    = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'List of users' });
});


module.exports = router;