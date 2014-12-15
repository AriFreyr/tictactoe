'use strict';

var express = require('express');

var router = express.Router();


module.exports = function(eventstore){
	var controller = require('./games.controller.js')(eventstore);
	router.get('/', controller.index);

	return router;
};
