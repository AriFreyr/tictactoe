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
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails();
		game.createNewGame();
	});

	it('it should logon and be able to create a game', function() {
		game.nameOfUser('TestUser');
		game.logIn();
		game.waitForDetails();
		game.createNewGame();
		game.waitForGame();
		game.clickOnCell1();
		game.clickOnCell2();
		game.clickOnCell3();
	});
});
