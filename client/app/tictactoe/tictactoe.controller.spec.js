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
		$httpBackend.expectPOST('/api/sendcommand').respond([{

		}]);

		scope.createGame(username);
		$httpBackend.flush();

		expect(scope.events.length).toBe(1);
		expect(scope.gameStarted).toBeTruthy();

	});

	it('should place move when asked', function(){
		$httpBackend.expectPOST('/api/sendcommand').respond([{
		}]);


		scope.events = [{id: 1, user: {id: 1}}];
		scope.placeMove(1, 2, {});
		$httpBackend.flush();

		expect(scope.gameOver).toBeFalsy();

	});

	it('should end game correctly', function(){
		$httpBackend.expectPOST('/api/sendcommand').respond([{
			event: 'GameWon'
		}]);


		scope.events = [{id: 1, user: {id: 1}}];
		scope.placeMove(1, 2, {});
		$httpBackend.flush();

		expect(scope.gameOver).toBeTruthy();

	});

});
