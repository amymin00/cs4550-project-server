import mongoose from 'mongoose';

const { Schema } = mongoose;

// Needs from frontend: [author, text]
const commentsSchema = new Schema({
    _id: String, // filled in the controller
    author: String, // user id
    timestamp: Date, // filled in the controller
    text: String,
}, {collection: 'comments'});

export default commentsSchema;