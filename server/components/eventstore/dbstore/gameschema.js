'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema({
	id: String,
	events: []
});

module.exports = mongoose.model('Game', gameSchema);
