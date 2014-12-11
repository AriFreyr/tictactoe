'use strict';

describe('Controller: DetailController', function () {

	// load the controller's module
	beforeEach(module('tictactoeApp'));

	var DetailController,
		scope,
		$httpBackend,
		$location;

	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$location_) {
		$httpBackend = _$httpBackend_;
		$location = _$location_;
		scope = $rootScope.$new();
		DetailController = $controller('DetailController', {
			$scope: scope
		});
	}));

	it('should get all games available', function () {

		$httpBackend.expectGET('/api/games').respond([{}]);

		$httpBackend.flush();

		expect(scope.games.length).toBe(1);

	});

	it('should get all games available and create a new game if asked', function () {


		$httpBackend.expectGET('/api/games').respond([{}]);
		$httpBackend.expectPOST('/api/sendcommand').respond([{}]);

		scope.createGame('user');
		$httpBackend.flush();

		expect(scope.games.length).toBe(1);

	});

	it('should get all games available and join a game if asked', function () {

		$httpBackend.expectGET('/api/games').respond([{}]);
		$httpBackend.expectPOST('/api/sendcommand').respond([{}]);

		scope.joinGame('user');
		$httpBackend.flush();

		expect(scope.games.length).toBe(1);

	});
});
