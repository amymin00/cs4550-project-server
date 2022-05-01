import usersModel from './usersModel.js';

export const findAllUsers = () => usersModel.find().sort({$natural: -1}).limit(10);
export const findUserById = id => usersModel.findById(id);
export const findUserByUsername = username => usersModel.findOne({username: username});
export const findUserByCredentials = (username, password) => usersModel.findOne({
    username: username,
    password: password,
});
export const findFollowingsPosts = () => usersModel.find();
export const findUsers = userIds => usersModel.find({_id: {$in: userIds}});
export const createUser = user => usersModel.create(user);
export const deleteUser = id => usersModel.deleteOne({_id: id});
export const updateUser = (id, user) => usersModel.updateOne({_id: id}, {$set: user});