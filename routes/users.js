var express    = require('express');
var router = express.Router();
var User = require('../models/user_model').user;


var checkPermissions = function(req, res, next){
    switch(req.method){
        case 'POST':{
            var permissions = ['create:users'];
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    continue;
                } else {
                    res.status(403).send({message:'Forbidden - access denied'});
                }
            }
            break;
        }
        case 'GET':{
            var permissions = ['read:users'];
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    continue;
                } else {
                    res.status(403).send({message:'Forbidden - access denied'});
                }
            }
            break;
        }
        case 'PUT':{
            var permissions = ['update:users'];
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    continue;
                } else {
                    res.status(403).send({message:'Forbidden - access denied'});
                }
            }
            break;
        }
        case 'DELTE':{
            var permissions = ['delete:users'];
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    continue;
                } else {
                    res.status(403).send({message:'Forbidden - access denied'});
                }
            }
            break;
        }
    }
};


router.get('/', function(req, res) {
    checkPermissions(req,res);
    User.find(function (err, users) {
        if(err)
            res.status(500).send(err);
        res.status(200).json({comment:users.length + " users retrieved.",data:users});
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
    User.find({'id': req.params.user_id},function (err, user) {
        if(err)
            res.status(500).send(err);
        else if(!user)
            res.status(200).json({comment:"No user found.",data:user});
        else
            res.status(200).json({comment:"user found.",data:user});
    });
});


module.exports = router;