'use strict';

describe('Controller: TicTacToeController', function () {

	// load the controller's module
	beforeEach(module('tictactoeApp'));

	var TicTacCtrl,
		scope,
		$httpBackend;

	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope){
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
		TicTacCtrl = $controller('TicTacToeController', {
			$scope: scope
		});
	}));

	it('should create new game with post method when asked', function(){
		var username = 'TEST';
		$httpBackend.expectPOST('/api/sendcommand').respond({
			response: [{}]
		});

		scope.createGame(username);
		$httpBackend.flush();

		expect(scope.events.length).toBe(1);

	});

});
