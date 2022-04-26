import mongoose from 'mongoose';
import usersSchema from './usersSchema.js';

const usersModel = mongoose.model('UsersModel', usersSchema);

export default usersModel;