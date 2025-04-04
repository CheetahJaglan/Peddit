// routes/posts.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");

// All post-related routes go here

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (req.query.json === "true") return res.json({ posts });
    res.render("posts", { posts });
  } catch (err) {
    console.log("Error fetching posts:", err);
    res.render("error_500", { err_msg: `Error fetching posts : ${err}` });
  }
});

router.get("/make_a_post", (req, res) => {
  res.render("send_form");
});

router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body.Post);
    await newPost.save();
    if (req.query.json === "true") return res.json({ success: true, post: newPost });
    res.redirect("/posts");
  } catch (err) {
    console.log("Error creating post:", err);
    res.render("error_500", { err_msg: "Error creating post" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.send("Post not found");
    if (req.query.json === "true") return res.json({ post });
    res.render("show", { post });
  } catch (err) {
    console.log("Error fetching post:", err);
    res.render("error_404", { err_msg: "The post you want to view doesn't exist" });
  }
});

router.get("/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { ...req.body.Post }, { new: true });
    if (!updatedPost) return res.send("Post not found");
    if (req.query.json === "true") return res.json({ success: true, post: updatedPost });
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log("Error updating post:", err);
    res.render("error_500", { err_msg: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.send("Post not found");
    if (req.query.json === "true") return res.json({ success: true, deletedPost });
    res.redirect("/posts");
  } catch (err) {
    console.log("Error deleting post:", err);
    res.render("error_500", { err_msg: "Error deleting post" });
  }
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
});

// Delete comment
router.delete("/:id/comment/:index", async (req, res) => {
  try {
    const { id, index } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.send("Post not found");

    const idx = parseInt(index, 10);
    if (idx < 0 || idx >= post.comments.length) return res.send("Invalid comment index");

    post.comments.splice(idx, 1);
    await post.save();
    res.redirect(`/posts/${id}`);
  } catch (err) {
    console.log("Error deleting comment:", err);
    res.render("error_500", { err_msg: "Error, sorry, there is an error on our side" });
  }
});

module.exports = router;
