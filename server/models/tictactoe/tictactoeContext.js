'use strict';

module.exports = function(eventStore, gameHandler) {

	return {
		handleCommand: function handleCommand(command) {

			var history = eventStore.loadEvents(command.id);
			var event = gameHandler(history).executeCommand(command);
			eventStore.saveEvent(event);
			return event;
		}
	};

};
