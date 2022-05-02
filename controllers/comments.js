import { nanoid } from 'nanoid';
import * as commentsDao from '../database/comments/commentsDao.js';

const createComment = async (req, res) => {
    const newComment = req.body;
    newComment._id = nanoid();
    newComment.timestamp = (new Date()).getTime();
    const insertedComment = await commentsDao.createComment(newComment);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(insertedComment);
}

const findAllComments = async (req, res) => {
    const comments = await commentsDao.findAllComments();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(comments);
}

const findCommentsInIdList = async (req, res) => {
    const ids = req.body.comments;
    const comments = await commentsDao.findCommentsInIdList(ids);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(comments);
}

const findCommentsByAuthor = async (req, res) => {
    const authorId = req.params.id;
    const comments = await commentsDao.findCommentsByAuthor(authorId);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(comments);
}

const findComment = async (req, res) => {
    const commentToFind = req.params.id;
    const comment = await commentsDao.findComment(commentToFind);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(comment);
}

const updateComment = async (req, res) => {
    const commentdIdToUpdate = req.params.id;
    const updatedComment = req.body;
    const status = await commentsDao.updateComment(commentdIdToUpdate, updatedComment);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(status);
}

const deleteComment = async (req, res) => {
    const commentdIdToDelete = req.params.id;
    const status = await commentsDao.deleteComment(commentdIdToDelete);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(status);
}   

export default app => {
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.post('/api/comments/post', findCommentsInIdList);
    app.get('/api/comments/author/:id', findCommentsByAuthor);
    app.get('/api/comments/:id', findComment);
    app.put('/api/comments/:id', updateComment);
    app.delete('/api/comments/:id', deleteComment);
}