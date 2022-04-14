import mongoose from 'mongoose';

const { Schema } = mongoose;

const usersSchema = new Schema({
    name: String,
    username: String,
    password: String,
    creator: Boolean,
    biography: String,
    image: String,
    songs: [String],
    playlists: [String],
    followers: [mongoose.Types.ObjectId],
    followees: [mongoose.Types.ObjectId],
}, {collection: 'users'});

export default usersSchema;