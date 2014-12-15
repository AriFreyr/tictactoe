'use strict';

var express = require('express');

var router = express.Router();

module.exports = function(eventstore) {

	var controller = require('./sendCommand.controller.js')(eventstore);
	router.post('/', controller.create);


	return router;

};
