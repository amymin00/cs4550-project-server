import commentsModel from './commentsModel.js';

export const findAllComments = () => commentsModel.find();
export const findComment = id => commentsModel.findById(id);
export const findCommentsInIdList = ids => commentsModel.find({_id: {$in: ids}}).sort({timestamp: -1}).limit(15);
export const findCommentsByAuthor = id => commentsModel.find({author: id}).sort({timestamp: -1}).limit(15);
export const createComment = comment => commentsModel.create(comment);
export const deleteComment = id => commentsModel.deleteOne({_id: id});
export const updateComment = (id, comment) => commentsModel.updateOne({_id: id}, {$set: comment})