import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [title (of post), author, song, text]
const postsSchema = new Schema({
    _id: String, // filled in controller
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
    song: { // spotify song id
        type: String,
        required: true,
        immutable: true,
    },
    text: String,
    likes: { // list of user ids
        type: [String],
        required: true,
        default: [],
    }, 
    comments: { // list of comment ids
        type: [String],
        required: true,
        comments: [],
    }, 
}, {collection: 'posts'});

export default postsSchema;