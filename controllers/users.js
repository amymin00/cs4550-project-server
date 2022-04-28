import { nanoid } from 'nanoid';
import * as usersDao from '../database/users/usersDao.js';
import * as postsDao from '../database/posts/postsDao.js';
import * as commentsDao from '../database/comments/commentsDao.js';

const createUser = async (req, res) => {
    const newUser = req.body;
    const existingUser = await usersDao.findUserByUsername(newUser.username);

    if (existingUser) {
        res.sendStatus(403);
    } else {
        newUser._id = nanoid();
        const insertedUser = await usersDao.createUser(newUser);
        req.session['currentUser'] = insertedUser;
        res.json(insertedUser);
    }
};

const updateCurrentUser = async (req, res) => {
    const userId = req.session['currentUser']._id;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(userId, updatedUser);
    req.session['currentUser'] = updatedUser;
    res.send(status);
};

const login = async (req, res) => {
    const existingUser = await usersDao.findUserByCredentials(req.body.username, req.body.password);

    if (existingUser) {
        req.session['currentUser'] = existingUser;
        return res.send(existingUser);
    } else {
        return res.sendStatus(503);
    }
};
  
const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const profile = (req, res) => {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.sendStatus(503);
    }
};

// ------------------------------------------------

const findUsersFollowers = async (req, res) => {
    const user = await usersDao.findUserById(req.params.id);
    const followers = await usersDao.findUsers(user.followers);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(followers);
};

const findUsersFollowing = async (req, res) => {
    const user = await usersDao.findUserById(req.params.id);
    const following = await usersDao.findUsers(user.following);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(following);
};

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users);
};

const findUserById = async (req, res) => {
    const userToFind = req.params.id;
    const user = await usersDao.findUserById(userToFind);
    // res.header("Access-Control-Allow-Origin", "*");
    res.json(user);
};

const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await usersDao.findUserByUsername(username);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(user);
};

const findUserByCredentials = async (req, res) => {
    const crendentials = req.body;
    const username = crendentials.username;
    const password = crendentials.password;
    const user = await usersDao.findUserByCredentials(username, password);
    res.header("Access-Control-Allow-Origin", "*");

    if (user) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

const updateUser = async (req, res) => {
    const userToUpdate = req.params.id;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(userToUpdate, updatedUser);
    res.send(status);
};

const deleteUser = async (req, res) => {
    const userId = await req.params.id;
    const user = await usersDao.findUserById(userId);

    // remove user from others' following list
    const followers = await usersDao.findUsers(user.followers);
    await Promise.all(followers.map(async u => {
        const newFollowing = u.following.filter(f => f._id !== userId);
        await usersDao.updateUser(userToUpdate, {following: newFollowing});
    }));

    // remove user from others' followers list
    const following = await usersDao.findUsers(user.following);
    await Promise.all(following.map(async u => {
        const newFollowers = u.followers.filter(f => f._id !== userId);
        await usersDao.updateUser(userToUpdate, {followers: newFollowers});
    }));

    // update posts made by user
    const usersPosts = await postsDao.findPostsByAuthor(userId);
    await Promise.all(usersPosts.map(async p => {
        await postsDao.updatePost(p._id, {author: 'deleted'});
    }));

    // update comments made by user
    const usersComments = await commentsDao.findCommentsByAuthor(userId);
    await Promise.all(usersComments.map(async c => {
        await commentsDao.updateComment(c._id, {author: 'deleted'});
    }));

    const status = await usersDao.deleteUser(user);
    res.send(status);
};


export default app => {
    app.post('/api/register', createUser);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.post('/api/profile', profile);
    app.put('/api/profile', updateCurrentUser);

    app.get('/api/users', findAllUsers);
    app.get('/api/users/followers/:id', findUsersFollowers);
    app.get('/api/users/following/:id', findUsersFollowing);
    app.get('/api/users/:id', findUserById);
    app.get('/api/users/username/:username', findUserByUsername);
    app.get('/api/users/credentials', findUserByCredentials);

    app.put('/api/users/:id', updateUser);

    app.delete('/api/users/:id', deleteUser);
};