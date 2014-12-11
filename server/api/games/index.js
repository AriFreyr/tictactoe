'use strict';

var express = require('express');
var controller = require('./games.controller.js');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
