'use strict';

// Test specific configuration
// ===========================
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://test:monalisa@ds061370.mongolab.com:61370/tictactoe'
	},
	eventstore: '/components/eventstore/memorystore/eventstore'
};
