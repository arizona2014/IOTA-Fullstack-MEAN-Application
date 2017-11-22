var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')
var schema = new Schema({
    content: { type: String, required: true },
    user: {type: Schema.Types.ObjectId , ref: 'User'}
});

schema.post('remove', function (video) {
    var deletedVideo = video;
    User.findById(video.user, function (err, user) {
        user.videos.pull(deletedVideo._id);
        user.save();
    })
})

module.exports = mongoose.model('Video', schema);
