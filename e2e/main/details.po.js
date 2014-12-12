'use strict';

var DetailPage = function() {
	this.newGameButton = element(by.css('.button-new-game'));
	this.gameList = element(by.css('.game-list'));
	this.firstGame = this.gameList.element(by.css('a:first-child'));
};

module.exports = new DetailPage();
