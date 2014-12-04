var _ = require('lodash');

module.exports = function(history) {

	var gamestate = require('./state')(history);

	return {
		executeCommand: function executeCommand(commandObject) {
			var command = commandObject.command;

			var events = {
				CreateGame: function CreateGame(cmdObj) {

					return [{
						id: cmdObj.id,
						event: 'GameCreated',
						user: cmdObj.user,
						timestamp: cmdObj.timestamp
					}];
				},
				JoinGame: function JoinGame(cmdObj) {

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
				PlaceMove: function PlaceMove(cmdObj) {

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
							event: 'GameWon',
							move: cmdObj.move,
							winner: cmdObj.user,
							timestamp: cmdObj.timestamp
						}];
					}
					else if (gamestate.isTie()) {
						return [{
							id: cmdObj.id,
							event: 'GameTie',
							move: cmdObj.move,
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
				},
				LeaveGame: function LeaveGame(cmdObj) {
					var winner = gamestate.leaveGame(cmdObj);

					if (winner !== undefined) {
						return [
							{
								id: cmdObj.id,
								event: 'LeftGame',
								user: cmdObj.user,
								timestamp: cmdObj.timestamp
							},
							{
								id: cmdObj.id,
								event: 'GameOver',
								winner: winner,
								timestamp: cmdObj.timestamp
							}
						];
					}
					else {
						return [
							{
								id: cmdObj.id,
								event: 'LeftGame',
								user: cmdObj.user,
								timestamp: cmdObj.timestamp
							}
						]
					}
				}
			};

			return events[command](commandObject);
		}
	}
};


