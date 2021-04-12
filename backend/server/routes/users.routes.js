const express = require('express');
const route = express.Router();

/* Controller */
const userCtrl = require('../controllers/user.controller')

route.post('/signIn', userCtrl.signIn)
route.post('/signUp', userCtrl.signUp)

module.exports = route