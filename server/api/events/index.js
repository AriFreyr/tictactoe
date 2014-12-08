'use strict';

var express = require('express');
var controller = require('./events.controller.js');

var router = express.Router();

router.get('/:id', controller.show);

module.exports = router;
