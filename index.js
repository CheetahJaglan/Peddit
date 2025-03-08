const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.get('/posts', (req, res) => {
    res.render('posts', { posts: posts.posts }); // Send only the array
});
app.post('/posts', (req, res) => {
    console.log(req.body);
    let { username, title, content } = req.body;
    let id = uuidv4();
    
    posts.posts.push({ id, username, title, content });
    
    fs.writeFileSync(
        path.join(__dirname, 'data.json'),
        JSON.stringify(posts, null, 2)
    );
    
    res.redirect('/posts');
});

app.get('/',(req,res) => {
    res.redirect("./posts")
});
app.get('/make_a_post',(req,res) => {
    res.render('send_form')
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
