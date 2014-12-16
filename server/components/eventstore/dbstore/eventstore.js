var _ = require('lodash'),
	q = require('q'),
	Game = require('./gameschema');

module.exports = function() {


	return {
		loadEvents: function loadEvents(eid) {
			var deferred = q.defer();

			Game.findOne({'id' :eid.toString()}, function(err, game){
				if (err) deferred.reject(err);
				deferred.resolve(game && game.events || []);
			});

			return deferred.promise;
		},
		saveEvent: function saveEvent(event) {
			var deferred = q.defer();

			var query = {'id': event[0].id};
			var options = {'new': true, 'upsert': true};
			var update = {'id': event[0].id, $pushAll: {'events': event}};

			Game.findOneAndUpdate(query, update, options, function(err, game) {
				if (err) deferred.reject(err);
				deferred.resolve(game.events);
			});

			return deferred.promise;
		},
		getKeys: function getKeys() {
			var deferred = q.defer();

			var query = Game.find({}).select('id');

			query.exec(function (err, ids) {
				if (err) deferred.reject(err);
				deferred.resolve(ids);
			});

			return deferred.promise;
		}
	};
};
