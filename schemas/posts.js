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
    author: {
        type: String,
        required: true,
        immutable: true,
    }, // list of user ids
    timestamp: {
        type: Number,
        required: true,
        immutable: true,
    }, // filled in controller
    song: {
        type: String,
        required: true,
        immutable: true,
    },
    text: String,
    likes: {
        type: [String],
        required: true,
    }, // list of user ids, filled in controller
    comments: {
        type: [String],
        required: true,
    }, // list of comment ids, filled in controller
}, {collection: 'posts'});

export default postsSchema;