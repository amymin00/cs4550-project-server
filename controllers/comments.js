import { nanoid } from 'nanoid';
import * as commentsDao from '../daos/comments.js';

const createComment = async (req, res) => {
    const newComment = req.body;
    newComment._id = nanoid();
    newComment.timestamp = (new Date()).getTime();
    const insertedComment = await commentsDao.createComment(newComment);
    res.json(insertedComment);
}

const findAllComments = async (req, res) => {
    const comments = await commentsDao.findAllComments();
    res.json(comments);
}  

const updateComment = async (req, res) => {
    const commentdIdToUpdate = req.params.id;
    const updatedComment = req.body;
    const status = await commentsDao.updateComment(commentdIdToUpdate, updatedComment);
    res.send(status);
}

const deleteComment = async (req, res) => {
    const commentdIdToDelete = req.params.id;
    const status = await commentsDao.deleteComment(commentdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.put('/api/comments/:id', updateComment);
    app.delete('/api/comments/:id', deleteComment);
}