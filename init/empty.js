const mongoose = require("mongoose");
const Post = require("../models/post.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Peddit";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`connect to db, url is ${MONGO_URL}`))
  .catch(console.log);

const clearPosts = async () => {
  await Post.deleteMany({});
  await Post.insertMany([]);
  console.log("data was rewritten");
};

clearPosts();

const clearUsers = async () => {
  await User.deleteMany({});
  await User.insertMany([]);
  console.log("data was rewritten");
};
clearUsers();
