var express    = require('express');
var router = express.Router();
var User = require('../models/user_model').user;


router.get('/', function(req, res) {
    User.find(function (err, users) {
        if(err)
            res(500).send(err);
        res.json({comment:'User created!',data:users});
    });
    res.json({ message: 'List of users' });
});

router.post('/', function(req, res) {
    var data = req.body;
    var user = new User(data);
    user.save(function(err){
        if(err)
            res(500).send(err);
        res.json({comment:'User created!',data:data});
    });
});


module.exports = router;