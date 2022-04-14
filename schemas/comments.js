import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [author, text]
const commentsSchema = new Schema({
    _id: String, // filled in the controller
    author: {
        type: String,
        required: true,
        immutable: true,
    }, // user id
    timestamp: {
        type: Number,
        required: true,
        immutable: true,
    }, // filled in the controller
    text: {
        type: String,
        required: true,
    },
}, {collection: 'comments'});

export default commentsSchema;