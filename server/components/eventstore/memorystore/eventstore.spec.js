'use strict';

var should = require('should');
var store = require('./eventstore');
var q = require('q');

describe('eventstore should manage events correctly', function() {

	it('should save events into storage if empty', function(){
		var memstore = store();

		memstore.saveEvent([{id: 1}]).then(function(savedEventId){
			should(savedEventId.id).be.exactly(1);
		});

	});

	it('should save events to same spot if storage is not empty', function(){
		var memstore = store();

		memstore.saveEvent([{id: 1}]).then(function(id1){
			memstore.saveEvent([{id: 1}]).then(function(id1){
				memstore.loadEvents(1).then(function(events){
					should(events.length).be.exactly(2);
				});
			});
		});


	});

	it('should return empty array if nothing found', function(){
		var memstore = store();
		memstore.loadEvents(1).then(function(events){
			should(events).eql([]);
		});
	});

	it('should return all keys for store', function(){
		var memstore = store();
		memstore.saveEvent([{id: 1}]).then(function(id){
			memstore.getKeys(1).then(function(keys){
				should(keys[0]).be.exactly(1);
			});
		});
	});
});

