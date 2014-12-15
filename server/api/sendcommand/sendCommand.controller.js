'use strict';

var context = require('../../models/tictactoe/tictactoeContext');
var game = require('../../models/tictactoe/models/tictactoe');

var app = require('../../app');


exports.create = function(req, res) {


	if (app.eventStore === undefined) {
		app.eventStore = require('../../components/eventstore/memorystore/eventstore')();
	}

	var store = app.eventStore;
	var result = context(store, game).handleCommand(req.body);

	res.json(result);
};
