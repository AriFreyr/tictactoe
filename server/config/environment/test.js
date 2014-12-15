'use strict';

// Test specific configuration
// ===========================
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://localhost/tictactoe-test'
	},
	eventstore: '/components/eventstore/memorystore/eventstore'
};
