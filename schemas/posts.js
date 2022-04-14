import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [title (of post), author, song, text]
const postsSchema = new Schema({
    _id: String,
    title: String,
    author: String, // list of user ids
    timestamp: Date, // filled in controller
    song: String,
    text: String,
    likes: [String], // list of user ids, filled in controller
    comments: [String], // list of comment ids, filled in controller
}, {collection: 'posts'});

export default postsSchema;