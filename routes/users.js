const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const router = express.Router();

// router
//

// Example route: GET /signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Example route: POST /users
router.post("/signup", upload.single("ProfilePic"), async (req, res) => {
  try {
    let { username, password, bio } = req.body;

    let cloudinaryUrl = null;
    if (req.file && req.file.path) {
      // req.file.path is the temp path on your server
      // but req.file.filename isn't the final Cloudinary name

      // ✅ Here's the important bit:
      cloudinaryUrl = req.file.path; // multer-storage-cloudinary injects secure_url here
    }

    const newUser = new User({
      username,
      password,
      bio,
      ProfilePic: cloudinaryUrl,
    });
    // Check if the username already exists
    await User.register(newUser, password);
    req.flash("success", "User Registered");
    res.redirect("/posts");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signup");
  }
});

router.get("/Profile/:username", async (req, res) => {
  const { username } = req.params;
  const TargetUser = await User.findByUsername(username);
  if (req.isAuthenticated()) {
    const user = req.user ? await User.findById(req.user._id) : null;
    if (user.username === TargetUser.username) {
      res.render("profile", { user : TargetUser, isSelf: true });
    } else {
    res.render("profile", { user : TargetUser, isSelf: false });
  }
  } else {
    req.flash("error", "Please log in to view this profile.");
    res.redirect("/users/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Logged In");
    res.redirect("/posts");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.redirect("/posts");
    }
    req.flash("success", "Logged Out");
    res.clearCookie("username");
    res.redirect("/posts");
  });
});

module.exports = router;