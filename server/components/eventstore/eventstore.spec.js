'use strict';

var should = require('should');
var store = require('./eventstore')

describe('eventstore should manage events correctly', function() {

	it('should save events into storage if empty', function(){
		var memstore = store();

		memstore.saveEvent({id: 1});

		should(memstore.loadEvents(1).length).be.exactly(1);
	});

	it('should save events to same spot if storage is not empty', function(){
		var memstore = store();

		memstore.saveEvent({id: 1});
		memstore.saveEvent({id: 1});

		should(memstore.loadEvents(1).length).be.exactly(2);
	});

	it('should return empty array if nothing found', function(){
		var memstore = store();

		should(memstore.loadEvents(1)).eql([]);
	});
});

