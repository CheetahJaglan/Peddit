const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    bio: {
        type: String,
        required: false,
    },
    profilePic: {
        type: String,
        default: 'www.profilepic.com/default.png'
    }
});

// This adds username and hashed password fields automatically
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
