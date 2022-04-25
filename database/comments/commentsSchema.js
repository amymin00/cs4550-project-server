import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [author, text]
const commentsSchema = new Schema({
    _id: String, // filled in the controller
    author: { // user id
        type: String,
        required: true,
        immutable: true,
    }, 
    timestamp: { // filled in the controller
        type: Number,
        required: true,
        immutable: true,
    }, 
    text: {
        type: String,
        required: true,
    },
}, {collection: 'comments'});

export default commentsSchema;