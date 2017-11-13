var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var User = require('../models/user');
var jwt = require('jsonwebtoken');


router.get('/', function (rea, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'success',
                obj: messages
            });
        });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if(err){
            return res.status(401).json({
               title: 'Non Authenticated',
               error: err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, doc) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: doc._id
        });
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            doc.messages.push(result);
            doc.save();
            res.status(201).json({
                message: 'Message saved',
                obj: result,
                username: doc.firstName
            });
        });
    })
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
       if(err){
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }
       if(!message){
           return res.status(500).json({
               title: 'No Message Found',
               error: {message: 'Message not found'}
           });
       }
       if(message.user != decoded.user._id){
           return res.status(401).json({
               title: 'Users dont match',
               error: { message: 'Users dont match'}
           });
       }
       message.content = req.body.content;
       message.save(function(err, result){
           if(err){
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
           res.status(200).json({
               message: 'Message updated',
               obj: result
           });
       })
    });
});

router.delete('/:id',  function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!message){
            return res.status(500).json({
                title: 'No Message Found',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Users dont match',
                error: { message: 'Users dont match'}
            });
        }
        message.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Message deleted',
                obj: result
            });
        })
    });
});

module.exports = router;