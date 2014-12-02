var _ = require('lodash');

module.exports = function(history) {

	var isGameFull = function isGameFull() {
		var isFull = false;
		_.forEach(history, function(event){
			if (event.event === 'GameJoined') {
				isFull = true;
			}
		});

		return isFull;
	};

	return {
		executeCommand: function executeCommand(commandObject) {
			var command = commandObject.command;

			var events = {
				CreateGame: function(cmdObj) {

					return [{
						id: cmdObj.id,
						event: 'GameCreated',
						user: cmdObj.user,
						timestamp: cmdObj.timestamp
					}];
				},
				JoinGame: function(cmdObj) {

					if(!isGameFull()) {
						return [{
							id: cmdObj.id,
							event: 'GameJoined',
							user: cmdObj.user,
							timestamp: cmdObj.timestamp

						}];
					}
					else {
						return [{
							id: cmdObj.id,
							event: 'GameFull',
							user: cmdObj.user,
							timestamp: cmdObj.timestamp
						}];
					}
				},
				PlaceMove: function(cmdObj) {

					return [{
						id: cmdObj.id,
						event: 'MovePlaced',
						move: cmdObj.move,
						user: cmdObj.user,
						timestamp: cmdObj.timestamp
					}]
				}
			};

			return events[command](commandObject);
		}
	}
};


