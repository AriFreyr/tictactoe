var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/games', function() {

	it('should return an array of all games', function(done){

		request(app).
			get('/api/games').
			expect(200).
			end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceOf(Array);
				done();
			});
	});
});
