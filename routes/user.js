// User Route
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var PayiotaAPI  = require('payiota');
var config = require('../config');

router.post('/', function (req, res, next) {

    var user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       password: bcrypt.hashSync(req.body.password, 10),
       email: req.body.email,
       hasPayed: "false"
    });
    user.save(function(err, result) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
           message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    User.findOne({'email': req.body.email}, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
               title: 'Login failed',
               error: { message: 'Invalid login credentials'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            hasPayed: user.hasPayed,
            userId: user._id
        })
    })
});

router.post('/pay', function(req, res, next){

    const payiota = new PayiotaAPI(config.payiota_key);

    payiota.buy({

            price: 42,
            custom: "some metadata",

    })
    .then(res => {
        console.log("transaction created", res)
    })
    .catch(err => {
        console.error(err)
    });

    res.status(200).json({
        title: 'OK',
        error: { message: 'KO'}
    });

});

module.exports = router;