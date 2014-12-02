var should = require('should');
var _ = require('lodash');

var game = require('./tictactoe');

describe('place move command', function() {

	it('should send placed move event if legal move', function(){

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
			}];

		var when = {
			id: '1',
			command: 'PlaceMove',
			move: {
				square: 3,
				type: 'X'
			},
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [
			{
				id: '1',
				event: 'MovePlaced',
				move: {
					square: 3,
					type: 'X'
				},
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

	it('should send illegal move event if outside board', function(){

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
			}];

		var when = {
			id: '1',
			command: 'PlaceMove',
			move: {
				square: 10,
				type: 'X'
			},
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [
			{
				id: '1',
				event: 'IllegalMove',
				move: {
					square: 10,
					type: 'X'
				},
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

	it('should send illegal move event if square is taken', function(){

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
			},
			{
				id: '1',
				event: 'MovePlaced',
				move: {
					square: 3,
					type: 'X'
				},
				user: {
					id: '1',
					username: 'Ari'
				},
				timestamp: '2014-12-02T14:04:04'
			}
		];

		var when = {
			id: '1',
			command: 'PlaceMove',
			move: {
				square: 3,
				type: 'X'
			},
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [
			{
				id: '1',
				event: 'IllegalMove',
				move: {
					square: 3,
					type: 'X'
				},
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
