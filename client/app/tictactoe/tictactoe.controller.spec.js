'use strict';

describe('Controller: TicTacToeController', function () {

	// load the controller's module
	beforeEach(module('tictactoeApp'));

	var TicTacCtrl,
		scope,
		$httpBackend,
		$interval,
		$stateParams;

	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$interval_, _$stateParams_){
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
		$interval = _$interval_;
		$stateParams = _$stateParams_;
		TicTacCtrl = $controller('TicTacToeController', {
			$scope: scope
		});
	}));


	it('should place move when asked', function(){
		$httpBackend.expectPOST('/api/sendcommand').respond([{
		}]);


		scope.events = [{id: 1, user: {id: 1}}];
		scope.myTurn = true;
		scope.placeMove(1, 2);
		$httpBackend.flush();

		expect(scope.gameOver).toBeFalsy();

	});

	it('should end game correctly', function(){
		$httpBackend.expectPOST('/api/sendcommand').respond([{
			event: 'GameWon',
			move: {
				square: 2
			},
			winner: {
				username: 'testuser'
			}
		}]);

		scope.myTurn = true;
		scope.events = [{id: 1, user: {id: 1}, move: {square: 1}}];
		scope.placeMove(1, 2);
		$httpBackend.flush();

		//expect(scope.gameOver).toBeTruthy();

	});

	it('should not allow move if its not your turn', function(){

		scope.myTurn = false;
		scope.events = [{id: 1, user: {id: 1}}];
		scope.placeMove(1, 2);

		$httpBackend.verifyNoOutstandingExpectation();

	});

});
