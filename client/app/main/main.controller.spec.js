'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('tictactoeApp'));

	var MainCtrl,
		scope,
		$httpBackend;

	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope){
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should set login variable of logged in', function(){
		scope.logIn();

		expect(scope.loggedIn).toBeTruthy();
	});

});
