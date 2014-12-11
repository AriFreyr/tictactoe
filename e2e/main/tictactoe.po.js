'use strict';

var GamePage = function() {

	this.gameBoard = element(by.css('.game-grid'));
	this.cellList = this.gameBoard.element(by.css('tr'));
	this.cell1 = this.cellList.element(by.css('.0x0'));
	this.cell2 = this.cellList.element(by.css('.0x1'));
	this.cell3 = this.cellList.element(by.css('.0x2'));
};

module.exports = new GamePage();
