if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");
const User = require('../models/user');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    // Check if the user is logged in and fetch their profile
    const user = req.user ? await User.findById(req.user._id) : null;

    // Just pass the user directly to the view. No messing with the image URL.
    res.render("posts", { posts, user });

  } catch (err) {
    res.render("error_500", { err_msg: `Error fetching posts : ${err}` });
  }
});



// Show create form
router.get("/make_a_post", (req, res) => {
  if (!req.isAuthenticated()){
    req.flash("error", "You must be logged in to view this page");
    return res.redirect("/");
  }
  res.render("send_form");
});

// Create new post
router.post("/", async (req, res) => {
  try {
    if (!req.isAuthenticated()){
      req.flash("error", "You must be logged in to post the content");
      return res.redirect("/users/login");
    }
    req.body.Post.username = req.user.username;
    const newPost = new Post(req.body.Post);
    await newPost.save();
    req.flash("success", "Post created successfully!");
    res.redirect("/posts");
  } catch (err) {
    req.flash("error", "Failed to create post.");
    res.redirect("/posts");
  }
});

// Show single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const Postuser = await User.findByUsername(post.username);
    const user = req.user ? await User.findById(req.user._id) : null;
    if (!post) {
      req.flash("error", "Post not found.");
      return res.redirect("/posts");
    }
    res.render("show", { post , postuser : Postuser, user});
  } catch (err) {
    res.render("error_404", { err_msg: "The post you want to view doesn't exist" });
    console.log(err);
  }
});

// Edit post form
router.get("/:id/edit", async (req, res) => {
  if (!req.isAuthenticated()){
    req.flash("error", "You cannot edit this post");
    return res.redirect(`/posts/${req.params.id}`);
  }
  const post = await Post.findById(req.params.id);
  if(!(req.user.username==post.username)){
    req.flash("error", "You cannot edit this post");
    return res.redirect(`/posts/${req.params.id}`);
  }
  res.render("edit", { post });
});

// Update post
router.patch("/:id", async (req, res) => {
  try {
    if (!req.isAuthenticated()){
      req.flash("error", "You cannot edit this post");
      return res.redirect(`/posts/${req.params.id}`);
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { ...req.body.Post }, { new: true });
    if (!updatedPost) {
      req.flash("error", "Post not found.");
      return res.redirect("/posts");
    }
    req.flash("success", "Post updated!");
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    req.flash("error", "Failed to update post.");
    res.redirect("/posts");
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    if (!req.isAuthenticated()){
      req.flash("error", "You cannot delete this post");
      return res.redirect(`/posts/${req.params.id}`);
    }
    const post = await Post.findById(req.params.id);
    if(!(req.user.username==post.username)){
      req.flash("error", "You cannot delete this post");
      return res.redirect(`/posts/${req.params.id}`);
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      req.flash("error", "Post not found.");
      return res.redirect("/posts");
    }
    req.flash("success", "Post deleted successfully!");
    res.redirect("/posts");
  } catch (err) {
    req.flash("error", "Error deleting post.");
    res.redirect("/posts");
  }
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    req.body.cUsername = req.user.username;
    post.comments.push(req.body);
    await post.save();
    req.flash("success", "Comment added!");
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    req.flash("error", "Failed to add comment.");
    res.redirect(`/posts/${req.params.id}`);
  }
});

// Delete comment
router.delete("/:id/comment/:index", async (req, res) => {
  try {
    if (!req.isAuthenticated()){
      req.flash("error", "You cannot delete this comment");
      return res.redirect(`/posts/${req.params.id}`);
    }
    const { id, index } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      req.flash("error", "Post not found.");
      return res.redirect("/posts");
    }

    const idx = parseInt(index, 10);
    if (idx < 0 || idx >= post.comments.length) {
      req.flash("error", "Invalid comment index.");
      return res.redirect(`/posts/${id}`);
    }

    post.comments.splice(idx, 1);
    await post.save();
    req.flash("success", "Comment deleted!");
    res.redirect(`/posts/${id}`);
  } catch (err) {
    req.flash("error", "Error deleting comment.");
    res.redirect(`/posts/${req.params.id}`);
  }
});

module.exports = router;