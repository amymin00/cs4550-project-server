import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [title (of post), author, song, text]
const postsSchema = new Schema({
    _id: String,
    title: {
        type: String,
        required: true,
        immutable: true,
    },
    author: { // list of user ids
        type: String,
        required: true,
        immutable: true,
    }, 
    timestamp: { // filled in controller
        type: Number,
        required: true,
        immutable: true,
    }, 
    song: {
        type: String,
        required: true,
        immutable: true,
    },
    text: String,
    likes: { // list of user ids, filled in controller
        type: [String],
        required: true,
    }, 
    comments: { // list of comment ids, filled in controller
        type: [String],
        required: true,
    }, 
}, {collection: 'posts'});

export default postsSchema;