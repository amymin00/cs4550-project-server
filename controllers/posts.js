import { nanoid } from 'nanoid';
import * as postsDao from '../database/posts/postsDao.js';

const createPost = async (req, res) => {
    const newPost = req.body;
    newPost._id = nanoid();
    newPost.timestamp = (new Date()).getTime();
    const insertedPost = await postsDao.createPost(newPost);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(insertedPost);
}

const findAllPosts = async (req, res) => {
    const posts = await postsDao.findAllPosts();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(posts);
}

const findPost = async (req, res) => {
    const postToFind = req.params.id;
    const post = await postsDao.findPost(postToFind);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(post);
}

const findPostsByAuthor = async (req, res) => {
    const authorId = req.params.id;
    const posts = await postsDao.findPostsByAuthor(authorId);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(posts);
}

const findPostsByAuthorsList = async (req, res) => {
    const authorIds = req.body.authors;
    const posts = await postsDao.findPostsByAuthorsList(authorIds);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(posts);
}

const findPostsBySong = async (req, res) => {
    const songId = req.params.id;
    const posts = await postsDao.findPostsBySong(songId);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(posts);
}

const findPostsBySongsList = async (req, res) => {
    const songIds = req.body.songs;
    const songs = await postsDao.findPostsBySongsList(songIds);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(songs);
}

const findPopularSongs = async (req, res) => {
    const data = await postsDao.findPopularSongs();
    const songs = data.map(d => d.song);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(songs);
}

const updatePost = async (req, res) => {
    const postdIdToUpdate = req.params.id;
    const updatedPost = req.body;
    const status = await postsDao.updatePost(postdIdToUpdate, updatedPost);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(status);
}

const deletePost = async (req, res) => {
    const postdIdToDelete = req.params.id;
    const status = await postsDao.deletePost(postdIdToDelete);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(status);
}   

export default app => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findAllPosts);
    app.get('/api/posts/:id', findPost);
    app.get('/api/posts/author/id/:id', findPostsByAuthor);
    app.post('/api/posts/author/list', findPostsByAuthorsList);
    app.get('/api/posts/song/id/:id', findPostsBySong);
    app.post('/api/posts/song/list', findPostsBySongsList);
    app.get('/api/posts/song/popular', findPopularSongs);
    app.put('/api/posts/:id', updatePost);
    app.delete('/api/posts/:id', deletePost);
}