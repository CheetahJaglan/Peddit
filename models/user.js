const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    bio: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    }
});

// This adds username and hashed password fields automatically
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
