var express    = require('express');
var router = express.Router();
var User = require('../models/user_model').user;


var checkPermissions = function(req, res, next){
    var permissions = [];
    switch(req.method){
        case 'POST':{
            //var permissions = ['create:users'];
            permissions.push('create:users');
            break;
        }
        case 'GET':{
            //var permissions = ['read:users'];
            permissions.push('read:users');
            break;
        }
        case 'PUT':{
            //var permissions = ['update:users'];
            permissions.push('update:users');
            break;
        }
        case 'DELTE':{
            //var permissions = ['delete:users'];
            permissions.push('update:users');
            break;
        }
    }
    for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
            continue;
        } else {
            res.status(403).send({message:'Forbidden - access denied'});
        }
    }
};


router.get('/', function(req, res) {
    checkPermissions(req,res);

    // parseInt attempts to parse the value to an integer
    // it returns a special "NaN" value when it is Not a Number.
    var page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    var limit = parseInt(req.query.limit);
    if (isNaN(limit)) {
        limit = 10;
    } else if (limit > 50) {
        limit = 50;
    } else if (limit < 1) {
        limit = 1;
    }
    User.find()
        .limit(limit)
        .skip(limit * (page-1))
        .sort({
            first_name: 'asc',
            last_name: 'asc',
            created: 'desc'
        })
        .exec(function (err, user) {
            if(err)
                res.status(500).send(err);
            else if(user.length==0)
                res.status(200).json({comment:"No user found.",data:user});
            else
                res.status(200).json({comment:user.length+" users found.",data:user});
        });
});

router.post('/', function(req, res) {
    checkPermissions(req,res);
    var data = req.body;
    var user = new User(data);
    user.save(function(err){
        if(err)
            res(500).send(err);
        res.status(201).json({comment:'User created!',data:data});
    });
});


router.get('/:user_id', function(req, res) {
    checkPermissions(req,res);
    User.find({'id': req.params.user_id})
        .exec(function (err, user) {
            if(err)
                res.status(500).send(err);
            else if(user.length==0)
                res.status(200).json({comment:"No user found.",data:user});
            else
                res.status(200).json({comment:"User found.",data:user});
        });
});

module.exports = router;