'use strict';

angular.module('tictactoeApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				abstract: true,
				url: '/game',
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl'
			})
			.state('main.list', {
				url: '/list',
				templateUrl: 'app/details/main.partial.html',
				controller: 'DetailController'
			})
			.state('main.game', {
				url: '/:id',
				templateUrl: 'app/tictactoe/tictactoe.html',
				controller: 'TicTacToeController'
			});
	});
