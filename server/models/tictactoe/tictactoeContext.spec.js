'use strict';

var should = require('should');
var q = require('q');

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
				var deferred = q.defer();
				eventId = eid;
				deferred.resolve([]);
				return deferred.promise;
			},
			saveEvent: function saveEvent(event) {
				var deferred = q.defer();
				deferred.resolve(1);
				return deferred.promise;
			}

		};

		var context = require('./tictactoeContext')(store, gameHandler);

		var testCommand = {
			id: '1337'
		};

		context.handleCommand(testCommand).then(function(data){
			should(calledWithId).be.exactly('1337');
			should(eventId).be.exactly('1337');
		});

	});
});
