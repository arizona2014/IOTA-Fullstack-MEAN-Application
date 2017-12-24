// User model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true, unique:true},
    hasPayed: {type: String, required: true },
    videos: [{type: Schema.Types.ObjectId, ref: 'Video' }]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
