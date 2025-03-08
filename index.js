const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.send("code working perfectly");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(posts)
});
