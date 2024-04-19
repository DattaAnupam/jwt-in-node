import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import authenticateToken from './middleware/index.js';

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

/**
 * This is a sample GET API which returns the first post of the user
 * The user is identified by the token sent in the request header
 * If the token is not present, the API returns 401
 * If the token is invalid, the API returns 403
 * If the user is not found, the API returns 404
 * If the user is found, the API returns the first post of the user
 */
APP.get('/posts', authenticateToken, (req, res) => {
    // filter the posts based on the valid user
    const result = posts.filter(post => post.user === req.user.name);

    // if no post is found, return 404
    if(result == undefined || result.length == 0) {
        res.set('content-type', 'application/json')
            .status(404)
            .send({message: 'No post found'});
    }

    // return the first post
    else {
        res.send({"title": result[0].title, "content": result[0].content});
    }
})

/**
 * This is a sample POST API which returns the token for the user
 * The user is identified by the username sent in the request body
 * The token is generated using the username and sent back to the client
 */
APP.post('/getToken', (req, res) => {
    console.log('Request received ' + JSON.stringify(req.body));
    const username = req.body.username;
    const user = {
        name: username
    }

    // generate token using user details sent
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    // send the token back to the client
    res.json({ accessToken: accessToken });
})

// start the server
APP.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
