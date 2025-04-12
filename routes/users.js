const express = require('express');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

// Example route: GET /signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Example route: POST /users
router.post('/signup', async (req, res) => {
    try{

        let {username, password, bio} = req.body;
        const newUser = new User({username, password, bio});
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


module.exports = router;