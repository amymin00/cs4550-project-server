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
    email: {
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
    biography: {
        type: String, 
        default: '',
    },
    songs: { // list of song ids taken from Spotify's Web API -- saved by users, created by creators
        type: [String],
        required: true,
        default: [],
    }, 
    followers: { // list of user ids
        type: [String],
        required: true,
        default: [],
    }, 
    following: { // list of user ids
        type: [String],
        required: true,
        default: [],
    }, 
}, {collection: 'users'});

export default usersSchema;