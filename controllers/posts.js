import { nanoid } from 'nanoid';
import * as postsDao from '../daos/posts.js';

const createPost = async (req, res) => {
    const newPost = req.body;
    // if _id is a duplicate (check error message for which key is duplicated),
    // then ask user to just submit request again
    // otherwise, notify user that so-and-so field must be changed
    newPost._id = nanoid();
    newPost.timeStamp = (new Date()).getTime();
    newPost.likes = [];
    newPost.comments = [];
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost);
}

const findAllPosts = async (req, res) => {
    const posts = await postsDao.findAllPosts();
    res.json(posts);
}  

const updatePost = async (req, res) => {
    const postdIdToUpdate = req.params.id;
    const updatedPost = req.body;
    const status = await postsDao.updatePost(postdIdToUpdate, updatedPost);
    res.send(status);
}

const deletePost = async (req, res) => {
    const postdIdToDelete = req.params.id;
    const status = await postsDao.deletePost(postdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findAllPosts);
    app.put('/api/posts/:id', updatePost);
    app.delete('/api/posts/:id', deletePost);
}