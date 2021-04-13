const express = require('express');
const route = express.Router();

/* Controller */
const postCtrl = require('../controllers/post.controller');

/* Get post */
route.get('/', postCtrl.getPosts);
route.post('/user', postCtrl.getPostsUserById);

/* Add post */
route.post('/add', postCtrl.addPost);

module.exports = route