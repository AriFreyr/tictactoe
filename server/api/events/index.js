'use strict';

var express = require('express');

var router = express.Router();


module.exports = function(eventsstore) {
	var controller = require('./events.controller.js')(eventsstore);
	router.get('/:id', controller.show);

	return router;
};
