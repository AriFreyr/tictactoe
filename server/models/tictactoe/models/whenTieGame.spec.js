var should = require('should');
var _ = require('lodash');

var game = require('./tictactoe');

describe('when game is tied', function() {

	it('should award a tie if all squares are taken', function() {
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
				event: 'MovePlaced',
				move: {
					square: 0,
					type: 'X'
				},
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
					square: 2,
					type: 'O'
				},
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'MovePlaced',
				move: {
					square: 1,
					type: 'X'
				},
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
					type: 'O'
				},
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'MovePlaced',
				move: {
					square: 5,
					type: 'X'
				},
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
					square: 4,
					type: 'O'
				},
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			},
			{
				id: '1',
				event: 'MovePlaced',
				move: {
					square: 6,
					type: 'X'
				},
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
					square: 7,
					type: 'O'
				},
				user: {
					id: '2',
					username: 'Gunnar'
				},
				timestamp: '2014-12-02T14:04:04'
			}

		];

		var when = {
			id: '1',
			command: 'PlaceMove',
			move: {
				square: 8,
				type: 'X'
			},
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-12-02T14:04:04'
		};

		var then = [{
			id: '1',
			event: 'GameTie',
			move: {
				square: 8,
				type: 'X'
			},
			timestamp: '2014-12-02T14:04:04'
		}];

		var result = game(given).executeCommand(when);

		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});
