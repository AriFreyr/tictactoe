'use strict';

angular.module('tictactoeApp').controller('TicTacToeController',
	['$scope', '$http', '$interval', '$stateParams', function ($scope, $http, $interval, $stateParams) {

		$scope.gameStarted = false;
		$scope.gameOver = false;
		$scope.events = [];
		$scope.board = [['','',''],['','',''],['','','']];
		$scope.player = '';
		$scope.myTurn = false;

		var intervalFun;

		var init = function init() {
			var id = $stateParams.id;

			if (!id) {
				return;
			}

			$http.get('/api/getevents/' + id).
				success(function(data) {
					$scope.events = data;
					angular.forEach(data, function(event, index) {
						processEvent(event, ((data.length-1) === index));
					});

					intervalFun = $interval(checkForChanges, 500);
				});

		};

		$scope.placeMove = function placeMove(row, col) {

			if ($scope.gameOver || !$scope.myTurn) {
				return;
			}

			var square = getSquare(row, col);

			$http.post('/api/sendcommand', {
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

		};

		$scope.getClass = function getClass(row, col) {
			return row + 'x' + col;
		};

		var checkForChanges = function checkForChanges() {
			var newestEvent = $scope.events[$scope.events.length - 1];
			$http.get('/api/getevents/' + $stateParams.id).success(function(data){
				angular.forEach(data, function(event, index){
					if (Date.parse(newestEvent.timestamp) < Date.parse(event.timestamp)) {
						processEvent(event, ((data.length-1) === index) );
						$scope.events.push(event);
					}
				});
			});
		};

		var processEvent = function processEvent(event, last) {
			if (event.event === 'MovePlaced') {

				placeMarker(event);
				$scope.myTurn = !$scope.myTurn;

				if ($scope.myTurn) {
					postMessage('Your turn!');
				}
				else {
					postMessage('Opponents turn!');
				}
			}
			else if (event.event === 'GameWon' || event.event === 'GameTie') {

				placeMarker(event);
				$scope.gameOver = true;
				$interval.cancel(intervalFun);
				postMessage('Game Over! ' + event.winner.username + ' has won!');

			}
			else if (event.event === 'GameCreated') {

				if (event.user.username === $scope.username) {

					$scope.player = 'X';
					postMessage('Your turn!');
					$scope.myTurn = true;
				}
				else if (last) {
					$http.post('/api/sendcommand', {
						id: parseInt($stateParams.id),
						command: 'JoinGame',
						user: {
							id: parseInt(Math.random() * 1000),
							username: $scope.username
						},
						timestamp: new Date().toISOString()
					});
				}
			}
			else if (event.event === 'GameJoined') {

				if (event.user.username === $scope.username) {

					$scope.player = 'O';
					postMessage('Opponents turn!');
				}
			}
		};

		var getSquare = function getSquare(row, col) {
			if(row === 0) {
				return col;
			}
			else if (row === 1) {
				return col + 3;
			}
			else {
				return col + 6;
			}
		};

		var getRow = function getRow(index) {
			return parseInt((index / 3) % 3);
		};

		var getCol = function getCol(index) {
			return index % 3;
		};

		$scope.$on('$destroy', function() {
			if (intervalFun) {
				$interval.cancel(intervalFun);
			}
		});

		var postMessage = function(message) {
			$('.message').text(message);
		};

		var placeMarker = function placeMarker(event) {

			var square = event.move.square;

			if (event.move.type === 'X') {
				$('.' + $scope.getClass(getRow(square), getCol(square))).css('background-image', 'url("' + '../assets/images/X.png' +'")');
			}
			else {
				$('.' + $scope.getClass(getRow(square), getCol(square))).css('background-image', 'url(' + '../assets/images/O.png' +')');
			}
		};

		init();


	}]);
