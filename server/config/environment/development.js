'use strict';

// Development specific configuration
// ==================================
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://development:monalisa@ds061370.mongolab.com:61370/tictactoe'
	},

	eventstore: 'eventstore/memorystore/eventstore',

	seedDB: true
};
