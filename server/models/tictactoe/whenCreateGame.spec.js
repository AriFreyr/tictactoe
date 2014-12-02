var should = require('should');
var _ = require('lodash');

var game = require('./tictactoe');

describe('created game command', function() {

	it('should send game created command', function() {
		var given = [];

		var when = {
			id: '1',
			command: 'CreateGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [{
			id: '1',
			event: 'GameCreated',
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
