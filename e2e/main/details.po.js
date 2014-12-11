'use strict';

var DetailPage = function() {
	this.newGameButton = element(by.css('.button-new-game'));
	this.gameList = element(by.css('.game-list'));
};

module.exports = new DetailPage();
