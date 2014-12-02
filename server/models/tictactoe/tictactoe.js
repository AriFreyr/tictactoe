module.exports = function(history) {

	return {
		executeCommand: function executeCommand(commandObject) {
			var command = commandObject.command;

			var events = {
				'CreateGame': [{
					id: commandObject.id,
					event: 'GameCreated',
					user: commandObject.user,
					timestamp: commandObject.timestamp
				}]
			};

			return events[command];
		}
	}
};
