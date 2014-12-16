'use strict';

var context = require('../../models/tictactoe/tictactoeContext');
var game = require('../../models/tictactoe/models/tictactoe');

var app = require('../../app');


module.exports = function(eventstore) {
	return {
		create: function(req, res) {
			context(eventstore, game).handleCommand(req.body).then(function (result){
				res.json(result);
			}, function (err){
				res.json(err);
			});

		}
	}
};
