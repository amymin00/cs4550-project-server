import commentsModel from './commentsModel.js';

export const findAllComments = () => commentsModel.find();
export const findComment = id => commentsModel.findOne({_id: id});
export const findCommentsByAuthor = id => commentsModel.find({author: id});
export const createComment = comment => commentsModel.create(comment);
export const deleteComment = id => commentsModel.deleteOne({_id: id});
export const updateComment = (id, comment) => commentsModel.updateOne({_id: id}, {$set: comment})