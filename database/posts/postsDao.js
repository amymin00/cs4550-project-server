import postsModel from './postsModel.js';

export const findAllPosts = () => postsModel.find().sort({timestamp: -1}).limit(15);
export const findPost = id => postsModel.findById(id);
export const findPostsByAuthor = id => postsModel.find({author: id}).sort({timestamp: -1}).limit(15);
export const findPostsByAuthorsList = userIds => postsModel.find({author: {$in: userIds}});
export const findPostsBySongsList = songIds => postsModel.find({song: {$in: songIds}});
export const findPostsBySong = id => postsModel.find({song: id});
export const createPost = post => postsModel.create(post);
export const deletePost = id => postsModel.deleteOne({_id: id});
export const updatePost = (id, post) => postsModel.updateOne({_id: id}, {$set: post})