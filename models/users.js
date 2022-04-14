import mongoose from 'mongoose';
import usersSchema from '../schemas/users.js';

const usersModel = mongoose.model('UsersModel', usersSchema);

export default usersModel;