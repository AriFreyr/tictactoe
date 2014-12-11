'use strict';

angular.module('tictactoeApp')
	.controller('DetailController', ['$scope','$http', '$location', function ($scope, $http, $location) {

		$scope.games = [];

		$scope.createGame = function createGame() {
			var promise = $http.post('/api/sendcommand', {
				id: randomId(1000),
				command: 'CreateGame',
				user: {
					id: randomId(1000),
					username: $scope.username
				},
				timestamp: new Date().toISOString()
			});

			promise.then(function(data){
				var events = data.data;

				if (events[0].event === 'GameCreated') {
					$location.path('/game/'+events[0].id);
				}
			});
		};

		$scope.joinGame = function joinGame(gameid) {
			$http.post('/api/sendcommand', {
				id: parseInt(gameid),
				command: 'JoinGame',
				user: {
					id: randomId(1000),
					username: $scope.username
				},
				timestamp: new Date().toISOString()
			});
		};

		var getGames = function getGames() {
			$http.get('/api/games').success(function(data){
				$scope.games = data;
			});
		};

		var randomId = function randomId(max) {
			return parseInt(Math.random() * max);
		};

		getGames();


	}]);
