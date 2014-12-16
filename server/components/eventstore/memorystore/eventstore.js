var _ = require('lodash'),
	q = require('q');

module.exports = function() {

	var eventStore = {};

	return {
		loadEvents: function loadEvents(eid) {
			var deferred = q.defer();

			deferred.resolve(eventStore[eid] || [])

			return deferred.promise;
		},
		saveEvent: function saveEvent(event) {
			var deferred = q.defer();
			eventStore[event[0].id] = (eventStore[event[0].id] || []).concat(event);
			deferred.resolve(eventStore[event[0].id]);
			return deferred.promise;
		},
		getKeys: function getKeys() {
			var deferred = q.defer();

			deferred.resolve(Object.keys(eventStore));

			return deferred.promise;
		}
	};
};
