'use strict';

var should = require('should');

describe('context should give the correct game to work with', function() {

	it('should give the game an event store to process and return output', function() {

		var calledWithId;

		var gameHandler = function(history) {
			return {
				executeCommand: function executeCommand(cmd) {
					calledWithId = cmd.id;
					return [];
				}
			};
		};

		var eventId;

		var store = {
			loadEvents: function loadEvents(eid) {
				eventId = eid;
				return [];
			}
		};

		var context = require('./tictactoeContext')(store, gameHandler);

		var testCommand = {
			id: '1337'
		};

		var result = context.handleCommand(testCommand);

		should(calledWithId).be.exactly('1337');
		should(eventId).be.exactly('1337');
	});
});
