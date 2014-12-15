'use strict';

var context = require('../../models/tictactoe/tictactoeContext');
var game = require('../../models/tictactoe/models/tictactoe');

var app = require('../../app');


module.exports = function(eventstore) {
	return {
		create: function(req, res)
			{
				var result = context(eventstore, game).handleCommand(req.body);

				res.json(result);
			}
	}
};
