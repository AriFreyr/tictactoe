'use strict';

var GamePage = function() {

	this.gameBoard = element(by.css('.game-grid'));
	this.cell1 = this.gameBoard.element(by.repeater('col in row').row(0));
	this.cell2 = this.gameBoard.element(by.repeater('col in row').row(1));
	this.cell3 = this.gameBoard.element(by.repeater('col in row').row(2));
	this.cell4 = this.gameBoard.element(by.repeater('col in row').row(3));
	this.cell5 = this.gameBoard.element(by.repeater('col in row').row(6));
	this.winner = element(by.css('.message'));
};

module.exports = new GamePage();
