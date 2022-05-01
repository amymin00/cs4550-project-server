import postsModel from './postsModel.js';

export const findAllPosts = () => postsModel.find().sort({timestamp: -1}).limit(10);
export const findPost = id => postsModel.findById(id);
export const findPostsByAuthor = id => postsModel.find({author: id});
export const findPostsByAuthorsList = userIds => postsModel.find({author: {$in: userIds}});
export const findPostsBySong = id => postsModel.find({song: id});
export const findPostsBySongsList = songIds => postsModel.find({song: {$in: songIds}});
export const findPopularSongs = () => postsModel.aggregate([
    { $group: {_id: '$song', numPosts: {$sum: 1}} },
    { $sort: {numPosts: -1} },
    { $limit: 15 },
    { $project: {_id: 0, 'song': '$_id'} },
]);
export const createPost = post => postsModel.create(post);
export const deletePost = id => postsModel.deleteOne({_id: id});
export const updatePost = (id, post) => postsModel.updateOne({_id: id}, {$set: post})