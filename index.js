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
  .then(() => console.log(`connect to db, url is ${MONGO_URL}`))
  .catch(console.log);

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

app.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.render("posts", { posts });
});

app.get("/make_a_post", (req, res) => {
  res.render("send_form");
});
app.get('/posts/:id/comment',(req,res) => {
  let {id} = req.params;
  res.render('comment',{id})
})

app.post("/posts", async (req, res) => {
  let comments = [];
  const newPost = new Post(req.body.Post)
  await newPost.save()
  res.redirect("/posts");
});
app.post('/posts/:id/comment',async (req,res) => {
  let {id} = req.params;
  let target_post = await Post.findById(id);
  target_post.comments.push(req.body);

  await target_post.save();
  console.log("Comment added successfully!");
  
  res.redirect(`/posts/${id}`)
})

app.get("/posts/:id", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);

  res.render("show", { post });
});

app.get("/posts/:id/edit", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  res.render("edit", { post });
});

app.patch("/posts/:id", async (req, res) => {
  let { id } = req.params;
  await Post.findByIdAndUpdate(id,{...req.body.Post})
  res.redirect(`/posts/${id}`);
});

app.delete("/posts/:id", async (req, res) => {
  let { id } = req.params;
  await Post.findByIdAndDelete(id)
  res.redirect("/posts");
});

app.delete('/posts/:id/comment/:index', async (req, res) => {
  let { id, index } = req.params;
  index = parseInt(index, 10); // Convert index from string to number
    let post = await Post.findById(id);
    if (index < 0 || index >= post.comments.length) {
      return res.status(400).send("Invalid comment index");
    }
    post.comments.splice(index, 1); // Remove the comment by index
    await post.save(); // Save changes to MongoDB
    res.redirect(`/posts/${id}`);

});


app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
