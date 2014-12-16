'use strict';
var q = require('q');

module.exports = function(eventStore, gameHandler) {

	return {
		handleCommand: function handleCommand(command) {

			var deferred = q.defer();

			eventStore.loadEvents(command.id).then(function(history){
				var event = gameHandler(history).executeCommand(command);
				eventStore.saveEvent(event).then(function() {
					deferred.resolve(event);
				}, function(err) {
					deferred.reject(err);
				});
			});

			return deferred.promise;
		}
	};

};
