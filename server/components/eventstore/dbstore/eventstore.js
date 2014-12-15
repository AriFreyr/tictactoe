var _ = require('lodash'),
	Game = require('./gameschema');

module.exports = function() {


	return {
		loadEvents: function loadEvents(eid) {
			Game.findOne({id:eid}, function(err, game){
				if (err) throw 'NotFound';
				return game.events;
			});
		},
		saveEvent: function saveEvent(event) {
			var query = {'id': event.id};
			var options = {'new': true, 'upsert': true};
			var update = {$push: {'events': event}};

			Game.findOneAndUpdate(query, update, options, function(err, game) {
				if (err) throw 'Error updating';
				return game;
			});
		},
		getKeys: function getKeys() {
			var query = Game.find({}).select('id');

			query.exec(function (err, ids) {
				if (err) throw 'Error getting ids';
				return ids;
			});
		}
	};
};
