'use strict';

module.exports = function(page) {
	var game;
	var details;
	var originalHandle;
	var secondaryHandle = 'second-window';
	var currentHandle;


	var setUpOpponent = function setUpOpponent() {
		browser.getAllWindowHandles().then(function (handles) {
			originalHandle = handles[0];
			currentHandle = originalHandle;
			browser.executeScript('window.open("http://localhost:9000", "second-window")');

		});
	};

	setUpOpponent();

	return {
		nameOfUser: function nameOfUser(username) {
			browser.refresh();
			page.usernameInput.sendKeys(username);
		},
		logIn: function logIn() {
			page.logInButton.click();
		},
		createNewGame: function createNewGame() {
			details.newGameButton.click();
		},
		waitForDetails: function waitForDetails(first) {
			browser.waitForAngular();
			if (first) {
				details = require('./details.po');
			}
		},
		waitForGame: function waitForGame(first) {
			browser.waitForAngular();
			if (first) {
				game = require('./tictactoe.po');
			}
		},
		clickOnCell1: function clickOnCell1() {
			game.cell1.click();
		},
		clickOnCell2: function clickOnCell2() {
			game.cell2.click();
		},
		clickOnCell3: function clickOnCell3() {
			game.cell3.click();
		},
		clickOnCell4: function clickOnCell4() {
			game.cell4.click();
		},
		clickOnCell5: function clickOnCell5() {
			game.cell5.click();
		},
		joinGame: function joinGame() {
			details.firstGame.click();
		},
		switchWindws: function switchWindows() {
			if (currentHandle === originalHandle) {
				browser.switchTo().window(secondaryHandle);
			}
			else {
				browser.switchTo().window(originalHandle);
			}
		},
		expectCellsToBeShowing: function expectCellsToBeShowing() {
			expect(game.cell1).toBeDefined();
		},
		checkWinner: function checkWinner(winner) {
			expect(game.winner.getText()).toBe('Game Over! ' + winner + ' has won!');
		},
		wait: function wait() {
			browser.sleep(1000);
		}

	};
};
