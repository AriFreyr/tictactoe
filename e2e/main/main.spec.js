'use strict';

describe('Main View', function() {
	var page;
	var game;

	beforeEach(function() {
		browser.sleep(1000);
		browser.get('/');
		page = require('./main.po');
		game = require('./game.dsl')(page);
	});


	it('it should logon and be able to play a game', function() {
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails(true);
		game.createNewGame();
		game.waitForGame(true);

		game.switchWindws();
		game.nameOfUser('Tester2');
		game.logIn();
		game.waitForDetails();
		game.joinGame();
		game.waitForGame();

		game.switchWindws();
		game.expectCellsToBeShowing();
		game.clickOnCell1();
		game.waitForGame();

		game.switchWindws();
		game.clickOnCell2();
		game.waitForGame();

		game.switchWindws();
		game.clickOnCell3();
		game.waitForGame();

		game.switchWindws();
		game.clickOnCell4();
		game.waitForGame();

		game.switchWindws();
		game.clickOnCell5();
		game.waitForGame();


	});


	it('it should logon and be able to create a game', function() {
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails(true);
		game.createNewGame();
		game.waitForGame(true);
		game.expectCellsToBeShowing();
	});
});
