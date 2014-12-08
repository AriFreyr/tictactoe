'use strict';

angular.module('tictactoeApp').controller('TicTacToeController',
	['$scope', '$http', function ($scope, $http) {

		$scope.username = '';
		$scope.gameStarted = false;
		$scope.gameOver = false;
		$scope.events = [];
		$scope.player = 'X';
		$scope.board = [['','',''],['','',''],['','','']];

		$scope.createGame = function createGame(username) {
			var promsise = $http.post('/api/sendcommand', {
				id: randomId(1000),
				command: 'CreateGame',
				user: {
					id: randomId(1000),
					username: username
				},
				timestamp: new Date().toISOString()
			});

			promsise.then(function(data){
				$scope.events = data.data;
			});

			$scope.gameStarted = true;
		};

		$scope.placeMove = function placeMove(row, col, $event) {
			var square;

			if(row === 0) {
				square = col;
			}
			else if (row === 1) {
				square = col + 3;
			}
			else {
				square = col + 6;
			}

			var promise = $http.post('/api/sendcommand', {
				id: $scope.events[0].id,
				command: 'PlaceMove',
				move: {
					square: square,
					type: $scope.player
				},
				user: {
					id: $scope.events[0].user.id,
					username: $scope.username
				},
				timestamp: new Date().toISOString()
			});

			promise.then(function(data) {
				var event = data.data[0];

				console.log(event);

				if (event.event !== 'IllegalMove') {
					if ($scope.player === 'X') {
						$($event.target).css('background-image', 'url("' + '../assets/images/X.png' +'")');
						$scope.player = 'O';
					}
					else {
						$($event.target).css('background-image', 'url(' + '../assets/images/O.png' +')');
						$scope.player = 'X';
					}
				}
			});
			console.log($event);
		};


		var randomId = function randomId(max) {
			return parseInt(Math.random() * max);
		};

	}]);
