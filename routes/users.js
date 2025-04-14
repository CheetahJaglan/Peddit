const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();


// router
//     .route('/')
//     .post(upload.single('ProfilePic'), (req, res) => {
//         res.send(req.file);
//     })

// Example route: GET /signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Example route: POST /users
router.post('/signup', upload.single('ProfilePic') , async (req, res) => {
    try{
        let {username, password, bio} = req.body;
        const profilePicPath = req.file ? `/uploads/${req.file.filename}` : null;
        console.log('Profile Pic Path:', req.file);
        console.log('Body:', req.body);
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