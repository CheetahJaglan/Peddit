const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const rateLimit = require("express-rate-limit");

const postRoutes = require("./routes/posts.js"); // 🌟 pulled out routes

const MONGO_URL = "mongodb://127.0.0.1:27017/Peddit";

// DB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected to DB at ${MONGO_URL}`))
  .catch(err => {
    console.log("Database connection error:", err);
  });

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later."
});
app.use(limiter);

// Payload size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Navbar helper
app.use((req, res, next) => {
  res.locals.draw_header = () => {
    return '<div class="navbar"><a href="/"><img src="/img/peddit_logo.png" alt="Peddit Logo" id="logo"></a><button id="toggle">Dark Mode</button></div>';
  };
  next();
});

// 🌐 Main Routes
app.use("/posts", postRoutes);

// 🔁 Redirect root to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// 🎲 Random Post
const Post = require("./models/post.js");
app.get("/random", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    if (count === 0) {
      return res.render("error_404", { err_msg: "No posts available" });
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomPost = await Post.findOne().skip(randomIndex);

    if (req.query.json === "true") {
      return res.json({ post: randomPost });
    }
    res.redirect(`/posts/${randomPost._id}`);
  } catch (err) {
    console.log("Error fetching random post:", err);
    res.render("error_500", { err_msg: "Error fetching random post" });
  }
});

// ❌ 404 Handler
app.use((req, res) => {
  res.render("error_404", { err_msg: `The page you are looking for doesn't exist` });
});

// 🧯 Global Error Handler
app.use((err, req, res, next) => {
  console.log("Unexpected error:", err);
  res.render("error_500", { err_msg: `Something went wrong` });
});

// 🔊 Server Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
