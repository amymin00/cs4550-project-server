import { nanoid } from 'nanoid';
import * as usersDao from '../daos/users.js';

const createUser = async (req, res) => {
    const newUser = req.body;
    newUser._id = nanoid();
    newUser.biography = '';
    newUser.songs = [];
    newUser.playlists = [];
    newUser.followers = [];
    newUser.following = [];
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}  

const updateUser = async (req, res) => {
    const usersIdToUpdate = req.params.id;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(usersIdToUpdate, updatedUser);
    res.send(status);
}

const deleteUser = async (req, res) => {
    const usersIdToDelete = req.params.id;
    const status = await usersDao.deleteUser(usersIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/:id', updateUser);
    app.delete('/api/users/:id', deleteUser);
}