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
    songs: {
        type: [String],
        required: true,
    }, // list of song ids taken from Spotify's Web API - intended for creators only
    playlists: {
        type: [String],
        required: true,
    }, // list of playlist ids taken from Spotify's Web API
    followers: {
        type: [String],
        required: true,
    }, // list of user ids
    following: {
        type: [String],
        required: true,
    }, // list of user ids
}, {collection: 'users'});

export default usersSchema;