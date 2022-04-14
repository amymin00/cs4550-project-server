import mongoose from 'mongoose';

const { Schema } = mongoose;

// groups = like subreddit
// Needs from frontend: [name (of group), topic]
const groupsSchema = new Schema({
    _id: String,
    name: String,
    topic: String,
    members: [String], // list of user ids, filled in controller
    posts: [String], // list of post ids, filled in controller
}, {collection: 'groups'});

export default groupsSchema;