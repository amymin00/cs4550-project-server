import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [name, username, password, creator (flag)]
const usersSchema = new Schema({
    _id: String,
    name: String,
    username: String,
    password: String,
    creator: Boolean,
    // all of below filled in controller
    biography: String, 
    songs: [String], // list of song ids taken from Spotify's Web API - intended for creators only
    playlists: [String], // list of playlist ids taken from Spotify's Web API
    followers: [String], // list of user ids
    following: [String], // list of user ids
}, {collection: 'users'});

export default usersSchema;