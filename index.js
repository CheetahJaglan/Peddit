if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const session = require("express-session");
const flash = require("connect-flash");
const MONGO_URL = "mongodb://127.0.0.1:27017/Peddit";
const passport = require("passport");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local");
// DB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected to DB at ${MONGO_URL}`))
  .catch(err => {
    console.log("Database connection error:", err);
  });




// Payload size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parser middleware
app.use(cookieParser());

// Session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Flash middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Navbar + flash helper
app.use((req, res, next) => {
  res.locals.draw_header = () => {
    return '<div class="navbar"><a href="/"><img src="/img/peddit_logo.png" alt="Peddit Logo" id="logo"></a><button id="toggle">Dark Mode</button></div>';
  };
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.cookie("username", req.user.username, { maxAge: 900000, httpOnly: true });
    next();
  }
  else {
    res.clearCookie("username");
    next();
  }
}
);

// Main Routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Redirect root to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Random Post
const Post = require("./models/post.js");
app.get("/random", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    if (count === 0) {
      return res.render("error_404", { err_msg: "No posts available" });
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomPost = await Post.findOne().skip(randomIndex);
    res.redirect(`/posts/${randomPost._id}`);
  } catch (err) {
    console.log("Error fetching random post:", err);
    res.render("error_500", { err_msg: "Error fetching random post" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.render("error_404", { err_msg: `The page you are looking for doesn't exist` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Unexpected error:", err);
  res.render("error_500", { err_msg: `Something went wrong` });
});

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
