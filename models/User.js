const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        
    },
    imageURL: {
        type: String,
    },
    profileURL: {
        type: String,
    },
    origin: {
        type: String,
        
    },
    githubId: {
        type: String,
    },
    twitchId: {
        type: String,
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    spotifyId: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;