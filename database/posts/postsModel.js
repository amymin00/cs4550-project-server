import mongoose from 'mongoose';
import postsSchema from './postsSchema.js';

const postsModel = mongoose.model('PostsModel', postsSchema);

export default postsModel;