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

	var isIllegalMove = function isIllegalMove(command) {

		var isTaken = false;

		if (command.move.square < 0 || command.move.square > 8) {
			return true;
		}

		_.forEach(history, function(event){
			if(event.event === 'MovePlaced') {
				if(event.move.square === command.move.square) {
					isTaken = true;
				}
			}
		});

		return isTaken;
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

					if (isIllegalMove(cmdObj)) {
						return [{
							id: cmdObj.id,
							event: 'IllegalMove',
							move: cmdObj.move,
							user: cmdObj.user,
							timestamp: cmdObj.timestamp
						}]
					}

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


