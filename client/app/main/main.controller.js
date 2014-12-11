'use strict';

angular.module('tictactoeApp')
	.controller('MainCtrl', function ($scope) {

		$scope.username = '';
		$scope.loggedIn = false;

		$scope.logIn = function logIn(){
			$scope.loggedIn = true;
		};

	});
