'use strict';

var express = require('express');
var controller = require('./createGame.controller');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
