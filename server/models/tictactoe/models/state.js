var _ = require('lodash');

module.exports = function(history) {

	var player1;
	var player2;
	var gameOver = false;
	var moveCounter = 0;

	_.forEach(history, function(event) {

		if (event.event === 'GameCreated') {
			player1 = event.user;
		}
		else if (event.event === 'GameJoined') {
			player2 = event.user;
		}
		else if (event.event === 'LeftGame') {
			if (JSON.stringify(player1) === JSON.stringify(event.user)) {
				player1 = undefined;
			}
			else {
				player2 = undefined;
			}
		}
		else if (event.event === 'MovePlaced') {
			moveCounter++;
		}
		else if (event.event === 'GameOver') {
			gameOver = true;
		}

	});


	return {

		isGameFull: function isGameFull() {
			var isFull = false;
			_.forEach(history, function (event) {
				if (event.event === 'GameJoined') {
					isFull = true;
				}
			});

			return isFull;
		},

		isIllegalMove: function isIllegalMove(command) {

			var isTaken = false;

			if (command.move.square < 0 || command.move.square > 8) {
				return true;
			}

			_.forEach(history, function (event) {
				if (event.event === 'MovePlaced') {
					if (event.move.square === command.move.square) {
						isTaken = true;
					}
				}
			});

			return isTaken;
		},

		isGameOver: function isGameOver(command) {
			var row = parseInt((command.move.square / 3) % 3);
			var col = command.move.square % 3;
			var doneMoves = [];

			doneMoves.push(command.move.square);

			_.forEach(history, function (event) {
				if (event.event === 'MovePlaced' && event.move.type === 'X') {
					doneMoves.push(event.move.square);
				}
			});

			//vertical win
			if (doneMoves.indexOf(row * 3) !== -1 && doneMoves.indexOf((row * 3) + 1) !== -1 && doneMoves.indexOf((row * 3) + 2) !== -1) {
				return true;
			}

			//horizontal win
			if (doneMoves.indexOf(col) !== -1 && doneMoves.indexOf(col + 3) !== -1 && doneMoves.indexOf(col + 6) !== -1) {
				return true;
			}

			//diagonal win
			if (doneMoves.indexOf(0) !== -1 && doneMoves.indexOf(4) !== -1 && doneMoves.indexOf(8) !== -1) {
				return true;
			}
			else if (doneMoves.indexOf(2) !== -1 && doneMoves.indexOf(4) !== -1 && doneMoves.indexOf(6) !== -1) {
				return true;
			}
		},

		leaveGame: function leaveGame(cmdObj) {
			if (player2 !== undefined && JSON.stringify(cmdObj.user) === JSON.stringify(player1)) {
				return player2;
			}
			else if (player1 !== undefined && JSON.stringify(cmdObj.user) === JSON.stringify(player2)) {
				return player1;
			}

			return undefined;
		},

		isTie: function isTie() {
			return moveCounter >= 8;
		}
	};
};
