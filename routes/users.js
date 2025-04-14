const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});
const router = express.Router();


// router
//   

// Example route: GET /signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Example route: POST /users
router.post('/signup', upload.single('ProfilePic') , async (req, res) => {
    try{
        let {username, password, bio} = req.body;
        const profilePicPath = req.file ? `/uploads/${req.file.filename}` : null;
        const newUser = new User({username, password, bio, profilePic: profilePicPath});
        await User.register(newUser, password);
        req.flash("success", "User Registered");
        res.redirect("/posts");
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/users/signup");
    }
})


router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login",
    passport.authenticate('local',{
        failureRedirect : "/users/login",
         failureFlash : true }),
        async (req,res) => {
            req.flash("success", "Logged In");
            res.redirect("/posts");
        });

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect("/posts");
        }
        req.flash("success", "Logged Out");
        res.clearCookie("username");
        res.redirect("/posts");
    });
}
);

module.exports = router;