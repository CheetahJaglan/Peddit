const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  cUsername: {
    type: String,
    required: true,
  },
  cTitle: {
    type: String,
    required: true,
  },
  cContent: {
    type: String
  },
});

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
