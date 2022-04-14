import mongoose from 'mongoose';

const { Schema } = mongoose;

// groups = like subreddit
// Needs from frontend: [name (of group), topic]
const groupsSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    topic: String,
    members: {
        type: [String],
        required: true,
    }, // list of user ids, filled in controller
    posts: {
        type: [String],
        required: true,
    }, // list of post ids, filled in controller
}, {collection: 'groups'});

export default groupsSchema;