'use strict';

module.exports = function(page) {
	var game;
	var details;

	return {
		nameOfUser: function nameOfUser(username) {
			page.usernameInput.sendKeys(username);
		},
		logIn: function logIn() {
			page.logInButton.click();
		},
		createNewGame: function createNewGame() {
			details.newGameButton.click();
		},
		waitForDetails: function waitForDetails() {
			browser.waitForAngular();
			details = require('./details.po');
		},
		waitForGame: function waitForGame() {
			browser.waitForAngular();
			game = require('./tictactoe.po');
		},
		clickOnCell1: function clickOnCell1() {
			game.cell1.click();
		},
		clickOnCell2: function clickOnCell2() {
			game.cell2.click();
		},
		clickOnCell3: function clickOnCell3() {
			game.cell3.click();
		}


	};
};
