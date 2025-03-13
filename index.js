const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Show all posts
app.get('/posts', (req, res) => {
    res.render('posts', { posts: posts.posts });
});

// Show form to create a new post
app.get('/make_a_post', (req, res) => {
    res.render('send_form');
});

// Create a new post
app.post('/posts', (req, res) => {
    let { username, title, content } = req.body;
    let id = uuidv4();
    let comments = []
    
    posts.posts.push({ id, username, title, content , comments});
    
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
    
    res.redirect('/posts');
});

// Show a single post
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.posts.find((p) => p.id === id);
    res.render('show', { post : post });
});

// Show edit form
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.posts.find((p) => p.id === id);
    res.render('edit', { post: post });
});

// Update a post (PATCH)
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { username, title, content } = req.body;

    let post = posts.posts.find((p) => p.id === id);
    if (post) {
        post.username = username;
        post.title = title;
        post.content = content;

        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
    }
    res.redirect(`/posts/${id}`);
});

// Delete a post (DELETE)
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts.posts = posts.posts.filter((p) => p.id !== id);

    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
    res.redirect('/posts');
});

app.get('/', (req, res) => {
    res.redirect("/posts");
});

app.get('/posts/:id/comment', (req, res) => {
    let { id } = req.params;
    let post = posts.posts.find((p) => p.id === id);
    res.render('comment', { post: post });
});

app.post('/posts/:id/comment',(req,res)=>{
    let { cUsername, cTitle, cContent } = req.body;
    let { id } = req.params;
    let post = posts.posts.find((p) => p.id === id);
    post.comments.push({cUsername, cTitle, cContent});
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
    res.redirect(`/posts/${id}`)
});
app.delete('/posts/:id/comment/:index', (req, res) => {
    let { id, index } = req.params;
    index = parseInt(index, 10); // Convert index to a number
    let post = posts.posts.find(p => p.id === id);
    post.comments.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
    res.redirect(`/posts/${id}`)
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
