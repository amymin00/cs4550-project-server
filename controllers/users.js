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

const findUser = async (req, res) => {
    const userToFind = req.params.id;
    const user = await usersDao.findUser(userToFind);
    res.json(user);
}

const updateUser = async (req, res) => {
    const userToUpdate = req.params.id;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(userToUpdate, updatedUser);
    res.send(status);
}

const deleteUser = async (req, res) => {
    const userToDelete = req.params.id;
    const status = await usersDao.deleteUser(userToDelete);
    res.send(status);
}

export default app => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:id', findUser);
    app.put('/api/users/:id', updateUser);
    app.delete('/api/users/:id', deleteUser);
}