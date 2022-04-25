import mongoose from 'mongoose';
import commentsSchema from './commentsSchema.js';

const commentsModel = mongoose.model('CommentsModel', commentsSchema);

export default commentsModel;