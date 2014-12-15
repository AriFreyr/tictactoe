var _ = require('lodash');

module.exports = function() {

	var eventStore = {};

	return {
		loadEvents: function loadEvents(eid) {
			if (eventStore[eid] === undefined) {
				return [];
			}
			else {
				return eventStore[eid];
			}
		},
		saveEvent: function saveEvent(event) {
			if (eventStore[event[0].id] === undefined) {
				eventStore[event[0].id] = [].concat(event);
			}
			else {
				eventStore[event[0].id] = eventStore[event[0].id].concat(event);
			}
		},
		getKeys: function getKeys() {
			return Object.keys(eventStore);
		}
	};
};
