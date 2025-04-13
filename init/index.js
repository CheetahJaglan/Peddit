const mongoose = require('mongoose');
const initData= require('./data.js');
const Post = require('../models/post.js');
const samplePosts = require('./data.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/Peddit'

mongoose.connect(MONGO_URL).then(() => console.log(`connect to db, url is ${MONGO_URL}`)).catch(console.log);

const initDB = async () => {
    await Post.deleteMany({});
    await Post.insertMany(samplePosts);
    console.log('data was rewritten')
}

initDB();