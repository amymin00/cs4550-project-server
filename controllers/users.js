import { nanoid } from 'nanoid';
import * as usersDao from '../database/users/usersDao.js';

const createUser = async (req, res) => {
    const newUser = req.body;
    const existingUser = await usersDao.findUserByUsername(newUser.username);

    if (existingUser) {
        res.sendStatus(403);
    } else {
        newUser._id = nanoid();
        newUser.biography = '';
        newUser.songs = [];
        newUser.playlists = [];
        newUser.followers = [];
        newUser.following = [];
        const insertedUser = await usersDao.createUser(newUser);
        req.session['currentUser'] = insertedUser;
        res.json(insertedUser);
    }
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}

const findUserById = async (req, res) => {
    const userToFind = req.params.id;
    const user = await usersDao.findUserById(userToFind);
    res.json(user);
}

const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await usersDao.findUserByUsername(username);
    res.json(user);
}

const findUserByCredentials = async (req, res) => {
    const crendentials = req.body;
    const username = crendentials.username;
    const password = crendentials.password;
    const user = await usersDao.findUserByCredentials(username, password);

    if (user) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
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
  
const signin = async (req, res) => {
    const existingUser = await usersDao.findUserByCredentials(req.body.username, req.body.password);

    if (existingUser) {
        req.session['currentUser'] = existingUser;
        return res.send(existingUser);
    } else {
        return res.sendStatus(503);
    }
}
  
const profile = (req, res) => {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.sendStatus(503);
    }
}

const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

export default app => {
    app.post('/api/signup', createUser);
    app.post('/api/signin', signin);
    app.post('/api/signout', signout);
    app.post('/api/profile', profile);

    app.get('/api/users', findAllUsers);
    app.get('/api/users/:id', findUserById);
    app.get('/api/users/username/:username', findUserByUsername);
    app.get('/api/users/credentials', findUserByCredentials);
    app.put('/api/users/:id', updateUser);
    app.delete('/api/users/:id', deleteUser);
}