var app = require('../../app');


exports.index = function(req, res) {


	if (app.eventStore === undefined) {
		app.eventStore = require('../../components/eventstore/memorystore/eventstore')();
	}

	var store = app.eventStore;
	var result = store.getKeys();

	res.json(result);
};
