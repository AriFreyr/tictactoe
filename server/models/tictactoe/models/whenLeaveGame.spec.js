var should = require('should');
var _ = require('lodash');

var game = require('./tictactoe');

describe('when player leaves game', function() {

	it('should award win to player that is left', function() {

		var given = [
			{
				id: '1',
				event: 'GameCreated',
				user: {
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'GameJoined',
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var when = {
			id: '1',
			command: 'LeaveGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [
			{
				id: '1',
				event: 'LeftGame',
				user: {
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'GameOver',
				winner: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var result = game(given).executeCommand(when);

		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it('should not award any win if player is only one left', function() {

		var given = [
			{
				id: '1',
				event: 'GameCreated',
				user: {
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'GameJoined',
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'LeftGame',
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var when = {
			id: '1',
			command: 'LeaveGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [
			{
				id: '1',
				event: 'LeftGame',
				user: {
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var result = game(given).executeCommand(when);

		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});
