'use strict';

angular.module('tictactoeApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap'
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.when('/', '/game/list')
			.when('', 'game/list')
			.otherwise('/game/list');

		$locationProvider.html5Mode(true);
	});
