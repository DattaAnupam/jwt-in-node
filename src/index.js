import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const APP = express();
const PORT = process.env.PORT || 3000;
const posts = [
    {
        title: 'First post',
        date: new Date(),
        content: 'This is the first post'
    },
    {
        title: 'Second post',
        date: new Date(),
        content: 'This is the second post'
    }
]

APP.use(express.json());
APP.get('/posts', (_, res, next) => {
    res.send(posts);

    next();
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
