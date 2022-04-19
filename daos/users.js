import usersModel from '../models/users.js';

export const findAllUsers = () => usersModel.find();
export const findUser = id => usersModel.findOne({_id: id});
export const createUser = user => usersModel.create(user);
export const deleteUser = id => usersModel.deleteOne({_id: id});
export const updateUser = (id, user) => usersModel.updateOne({_id: id}, {$set: user})