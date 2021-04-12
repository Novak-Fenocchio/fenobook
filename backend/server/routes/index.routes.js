const express = require('express');
const route = express.Router();

/* Controller */
const IndexCtrl = require('../controllers/index.controller');

route.get('/', IndexCtrl.renderIndex);

module.exports = route;