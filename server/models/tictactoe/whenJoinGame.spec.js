var should = require('should');
var _ = require('lodash');

var game = require('./tictactoe');

describe('join game command', function() {

	it('should send game joined command if not full', function() {
		var given = [{
			id: '1',
			event: 'GameCreated',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		}];

		var when = {
			id: '1',
			command: 'JoinGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [{
			id: '1',
			event: 'GameJoined',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		}];

		var result = game(given).executeCommand(when);

		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it('should send gamefull event if game is full', function() {
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
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var when = {
			id: '1',
			command: 'JoinGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [{
			id: '1',
			event: 'GameFull',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		}];

		var result = game(given).executeCommand(when);

		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});
