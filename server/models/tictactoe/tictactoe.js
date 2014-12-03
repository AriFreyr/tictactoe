var _ = require('lodash');

module.exports = function(history) {

	var gamestate = require('./state')(history);

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

					if (!gamestate.isGameFull()) {
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

					if (gamestate.isIllegalMove(cmdObj)) {
						return [{
							id: cmdObj.id,
							event: 'IllegalMove',
							move: cmdObj.move,
							user: cmdObj.user,
							timestamp: cmdObj.timestamp
						}];
					}
					else if (gamestate.isGameOver(cmdObj)) {
						return [{
							id: cmdObj.id,
							event: 'GameOver',
							move: cmdObj.move,
							user: cmdObj.user,
							timestamp: cmdObj.timestamp
						}];
					}

					return [{
						id: cmdObj.id,
						event: 'MovePlaced',
						move: cmdObj.move,
						user: cmdObj.user,
						timestamp: cmdObj.timestamp
					}];
				}
			};

			return events[command](commandObject);
		}
	}
};


