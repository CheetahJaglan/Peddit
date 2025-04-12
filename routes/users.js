const express = require('express');

const router = express.Router();

// Example route: GET /signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Example route: POST /users
router.post('/', (req, res) => {
    res.send('Create a new user');
});

module.exports = router;