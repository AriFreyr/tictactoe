'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/sendcommand', function() {

	it('should return a event object if provided valid command', function(done) {

		var body = {
			id: '1',
			command:'CreateGame',
			user: {
				id: '1',
				username: 'Ari'
			},
			timestamp: '2014-04-04T15:40:40'
		};

		request(app).
			post('/api/sendcommand').
			type('json').
			send(body).
			end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceOf(Array);
				res.body.length.should.be.exactly(1);
				done();
			});
	});
});
