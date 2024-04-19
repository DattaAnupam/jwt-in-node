import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const APP = express();
const PORT = process.env.PORT || 3000;
const posts = [
    {
        user: 'Anupam',
        title: 'First post',
        date: new Date(),
        content: 'This is the first post'
    },
    {
        user: 'Anupam Datta',
        title: 'Second post',
        date: new Date(),
        content: 'This is the second post'
    }
]

APP.use(express.json());

APP.get('/posts', (req, res) => {
    const result = posts.filter(post => post.user === req.body.username);
    if(result == undefined || result.length == 0) {
        res.set('content-type', 'application/json')
            .status(404)
            .send({message: 'No post found'});
    }

    else {
        res.send({"title": result[0].title, "content": result[0].content});
    }
})

APP.post('/getToken', (req, res) => {
    console.log('Request received ' + JSON.stringify(req.body));
    const username = req.body.username;
    const user = {
        name: username
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({ accessToken: accessToken });
})

APP.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
