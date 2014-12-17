'use strict';

describe('Main View', function() {
	var page;
	var game;

	beforeEach(function() {
		browser.get('/');
		page = require('./main.po');
		game = require('./game.dsl')(page);
	});

	it('it should logon and be able to create a game', function() {
		game.waitForDetails();
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails(true);
		game.createNewGame();
		game.waitForGame(true);
		game.expectCellsToBeShowing();
	});


	it('it should logon and be able to play a game', function() {
		game.waitForDetails();
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails(true);
		game.createNewGame();
		game.waitForGame(true);
		game.expectCellsToBeShowing();
		expect(game.checkMessage()).toBe('Your turn!');

		browser.getCurrentUrl().then(function(url) {

			browser.getAllWindowHandles().then(function (handles) {
				var originalHandle = handles[0];
				browser.executeScript('window.open("' + url + '", "second-window")');
				browser.switchTo().window('second-window');

				game.waitForGame();
				game.nameOfUser('TestUser2');
				game.logIn();
				game.waitForGame();
				game.expectCellsToBeShowing();
				expect(game.checkMessage()).toBe('Opponents turn!');
				game.waitForGame();

				browser.executeScript('window.close()');
			});
		});


	});

});
