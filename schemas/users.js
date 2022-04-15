import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [name, username, password, creator (flag)]
const usersSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    creator: {
        type: Boolean,
        required: true,
    },
    // all of below filled in controller
    biography: String, 
    songs: { // list of song ids taken from Spotify's Web API -- saved by users, created by creators
        type: [String],
        required: true,
    }, 
    followers: { // list of user ids
        type: [String],
        required: true,
    }, 
    following: { // list of user ids
        type: [String],
        required: true,
    }, 
}, {collection: 'users'});

export default usersSchema;