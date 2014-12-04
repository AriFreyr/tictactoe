'use strict';

var context = require('../../models/tictactoe/tictactoeContext');
var game = require('../../models/tictactoe/models/tictactoe');

exports.create = function(req, res) {

	var store = {
		loadEvents: function loadEvents(eid) {
			return [];
		}
	};

	var result = context(store, game).handleCommand(req.body);

	res.json(result);
};
