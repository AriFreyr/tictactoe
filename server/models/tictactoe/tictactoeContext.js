'use strict';

module.exports = function(eventStore, gameHandler) {

	return {
		handleCommand: function handleCommand(command) {

			var history = eventStore.loadEvents(command.id);
			return gameHandler(history).executeCommand(command);
		}
	};

};
