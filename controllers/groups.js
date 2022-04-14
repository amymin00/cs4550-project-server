import { nanoid } from 'nanoid';
import * as groupsDao from '../daos/groups.js';

const createGroup = async (req, res) => {
    const newGroup = req.body;
    newGroup._id = nanoid();
    newGroup.members = [];
    newGroup.posts = [];
    const insertedGroup = await groupsDao.createGroup(newGroup);
    res.json(insertedGroup);
}

const findAllGroups = async (req, res) => {
    const groups = await groupsDao.findAllGroups();
    res.json(groups);
}  

const updateGroup = async (req, res) => {
    const groupdIdToUpdate = req.params.id;
    const updatedGroup = req.body;
    const status = await groupsDao.updateGroup(groupdIdToUpdate, updatedGroup);
    res.send(status);
}

const deleteGroup = async (req, res) => {
    const groupdIdToDelete = req.params.id;
    const status = await groupsDao.deleteGroup(groupdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/groups', createGroup);
    app.get('/api/groups', findAllGroups);
    app.put('/api/groups/:id', updateGroup);
    app.delete('/api/groups/:id', deleteGroup);
}