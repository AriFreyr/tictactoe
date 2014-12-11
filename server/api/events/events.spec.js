var should = require('should');
var app = require('../../app');
var request = require('supertest');
var _ = require('lodash');

describe('GET /api/getevents', function() {

	it('should return events', function(done) {

		request(app).
			get('/api/getevents/1').
			expect(200).
			end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceOf(Array);
				done();
			});
	});

});
