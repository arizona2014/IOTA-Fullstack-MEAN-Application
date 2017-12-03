var express = require('express');
var router = express.Router();
var Video = require('../models/video');
var User = require('../models/user');
var jwt = require('jsonwebtoken');


router.get('/', function (rea, res, next) {
    Video.find()
        .populate('user', 'firstName')
        .exec(function (err, videos) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'success',
                obj: videos
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
        console.log(req.body);
        var video = new Video({
            content: req.body.content,
            link: req.body.link,
            user: doc._id
        });
        video.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            doc.videos.push(result);
            doc.save();
            res.status(201).json({
                message: 'Video saved',
                obj: result,
                username: doc.firstName
            });
        });
    })
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Video.findById(req.params.id, function(err, video){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!video){
            return res.status(500).json({
                title: 'No Video Found',
                error: {message: 'Video not found'}
            });
        }
        if(video.user != decoded.user._id){
            return res.status(401).json({
                title: 'Users dont match',
                error: { message: 'Users dont match'}
            });
        }
        video.content = req.body.content;
        video.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Video updated',
                obj: result
            });
        })
    });
});

router.delete('/:id',  function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Video.findById(req.params.id, function(err, video){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!video){
            return res.status(500).json({
                title: 'No Video Found',
                error: {message: 'Video not found'}
            });
        }
        if(video.user != decoded.user._id){
            return res.status(401).json({
                title: 'Users dont match',
                error: { message: 'Users dont match'}
            });
        }
        video.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Video deleted',
                obj: result
            });
        })
    });
});

module.exports = router;