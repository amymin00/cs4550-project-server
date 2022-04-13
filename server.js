import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import listenersController from './controllers/listeners.js';
import postsController from './controllers/posts.js';
import creatorsController from './controllers/creators.js';
import groupsController from './controllers/groups.js';
import commentsController from './controllers/comments.js';

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PW;
const uri = `mongodb+srv://${username}:${password}@cluster0.jb1wc.mongodb.net/webdev-project?retryWrites=true&w=majority`;
mongoose.connect(uri);

// Use middleware
const app = express();
app.use(cors());
app.use(express.json());

// Add endpoints for various APIs
listenersController(app);
postsController(app);
creatorsController(app);
groupsController(app);
commentsController(app);

app.listen(process.env.PORT || 4000);