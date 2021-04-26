const express = require('express');
const route = express.Router();

/* Controller */
const userCtrl = require('../controllers/user.controller')

route.post('/signIn', userCtrl.signIn)
route.post('/signUp', userCtrl.signUp)
route.post('/searchUser', userCtrl.searchUser)
route.post('/searchUserByName', userCtrl.searchUserByName)
route.post('/changeAvatar', userCtrl.changeAvatar)

/* Add follower */
route.post('/addFollower', userCtrl.addFollower);
/* Get followers */
route.post('/getFollowers', userCtrl.getFollowers);
/* Get followers that I  dont following */
route.post('/NotFollowing', userCtrl.getNotFollowing)
module.exports = route