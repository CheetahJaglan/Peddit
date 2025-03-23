const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const Post = require("./models/post.js");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/Peddit";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected to DB at ${MONGO_URL}`))
  .catch(err => {
    console.log("Database connection error:", err);
  });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.draw_header = () => {
    return '<div class="navbar"><a href="/"><img src="/img/peddit_logo.png" alt="Peddit Logo" id="logo"></a><button id="toggle">Dark Mode</button> </div>';
  };
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    if (req.query.json === "true") {
      return res.json({ posts });
    }
    res.render("posts", { posts });
  } catch (err) {
    console.log("Error fetching posts:", err);
    res.render('error_500', {err_msg : `Error fetching posts : ${err} `});
  }
});

app.get("/make_a_post", (req, res) => {
  res.render("send_form");
});

app.get("/posts/:id/comment", (req, res) => {
  let { id } = req.params;
  res.render("comment", { id });
});

app.post("/posts", async (req, res, next) => {
  try {
    const newPost = new Post(req.body.Post);
    await newPost.save();
    if (req.query.json === "true") {
      return res.json({ success: true, post: newPost });
    }
    res.redirect("/posts");
  } catch (err) {
    console.log("Error creating post:", err);
    res.render('error_500', {err_msg : `Error creating post`});
  }
});

app.get("/posts/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let post = await Post.findById(id);
    if (!post) return res.send("Post not found");
    if (req.query.json === "true") {
      return res.json({ post });
    }
    res.render("show", { post });
  } catch (err) {
    console.log("Error fetching post:", err);
    res.render('error_404', {err_msg : `The post you want to view doesn't exist`});
  }
});

app.patch("/posts/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let updatedPost = await Post.findByIdAndUpdate(id, { ...req.body.Post }, { new: true });
    if (!updatedPost) return res.send("Post not found");
    if (req.query.json === "true") {
      return res.json({ success: true, post: updatedPost });
    }
    res.redirect(`/posts/${id}`);
  } catch (err) {
    console.log("Error updating post:", err);
    res.render('error_500', {err_msg : `Internal server error`});
  }
});

app.get("/posts/:id/edit", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  res.render("edit", { post });
});

app.delete("/posts/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.send("Post not found");
    if (req.query.json === "true") {
      return res.json({ success: true, deletedPost });
    }
    res.redirect("/posts");
  } catch (err) {
    console.log("Error deleting post:", err);
    res.render('error_500', {err_msg : `Error deleting post`});
  }
});

app.patch("/posts/:id", async (req, res) => {
  let {id} = req.params;
  await Post.findByIdAndUpdate(id ,{...req.body.Post})
  res.redirect(`./posts/${id}`);
});

app.delete("/posts/:id/comment/:index", async (req, res, next) => {
  try {
    let { id, index } = req.params;
    index = parseInt(index, 10);
    let post = await Post.findById(id);
    if (!post) return res.send("Post not found");
    if (index < 0 || index >= post.comments.length) {
      return res.send("Invalid comment index");
    }
    post.comments.splice(index, 1);
    await post.save();
    res.redirect(`/posts/${id}`);
  } catch (err) {
    console.log("Error deleting comment:", err);
    res.render('error_500', {err_msg : `Error, sorry, there is an error on our side`})
  }
});

app.post('/posts/:id/comment',async (req,res) => {
  let {id} = req.params;
  let target_post = await Post.findById(id);
  target_post.comments.push(req.body);

  await target_post.save();
  console.log("Comment added successfully!");
  
  res.redirect(`/posts/${id}`)
})

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use((req, res) => {
  res.render('error_404', {err_msg : `The page you are looking for doesn't exist`});
});
// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Unexpected error:", err);
  res.render('error_500', {err_msg : `Something went wrong`});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
