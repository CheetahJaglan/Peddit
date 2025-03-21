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

app.use((req, res, next) => {
    res.locals.draw_header = () => {
        return '<div class="navbar"><a href="/"><img src="/img/peddit_logo.png" alt="Peddit Logo" id="logo"></a><button id="toggle">Dark Mode</button> </div>';
    };
    next();
});

let posts = { posts: [] };

try {
    posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
} catch (err) {
    console.error("Error reading data.json: ", err);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/posts', (req, res) => {
    if (req.query.json === 'true') {
        return res.json(posts.posts);
    }
    res.render('posts', { posts: posts.posts });
});

app.get('/make_a_post', (req, res) => {
    res.render('send_form');
});

app.post('/posts', (req, res) => {
    try {
        let { username, title, content } = req.body;
        let id = uuidv4();
        let comments = [];

        posts.posts.push({ id, username, title, content, comments });
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
        res.redirect('/posts');
    } catch (err) {
        console.error("Error creating a post: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");
    
    if (req.query.json === 'true') {
        return res.json(post);
    }
    
    res.render('show', { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");
    res.render('edit', { post });
});

app.patch('/posts/:id', (req, res) => {
    try {
        let { id } = req.params;
        let { username, title, content } = req.body;
        let post = posts.posts.find(p => p.id === id);
        if (!post) return res.status(404).send("Post not found");

        post.username = username;
        post.title = title;
        post.content = content;
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));

        res.redirect(`/posts/${id}`);
    } catch (err) {
        console.error("Error updating post: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/posts/:id', (req, res) => {
    try {
        let { id } = req.params;
        posts.posts = posts.posts.filter(p => p.id !== id);
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(posts, null, 2));
        res.redirect('/posts');
    } catch (err) {
        console.error("Error deleting post: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req, res) => {
    res.redirect("/posts");
});

app.use((err, req, res, next) => {
    console.error("Unexpected error: ", err);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
