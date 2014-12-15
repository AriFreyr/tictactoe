'use strict';

var should = require('should');

describe('database store', function(){

	it('should store game history', function(){
		var Game = require('./gameschema');

		var test = {
			id: 'test',
			events: [{event: 'stuff'}]
		};

		Game.create(test, function(err, events) {
			if (err) return handleError(res, err);
		});
		events._id.should.not.be.undefined;

		return done();
	});
});

