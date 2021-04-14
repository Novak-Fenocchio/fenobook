const express = require('express');
const route = express.Router();

/* Controller */
const postCtrl = require('../controllers/post.controller');

/* Get post */
route.post('/post', postCtrl.getAPost);
route.get('/', postCtrl.getPosts);
route.post('/user', postCtrl.getPostsUserById);

/* Add post */
route.post('/add', postCtrl.addPost);

/* Like */
route.post('/like', postCtrl.giveLike);
route.post('/dislike', postCtrl.giveDislike);


module.exports = route