var app = require('../../app');


exports.show = function(req, res) {


	if (app.eventStore === undefined) {
		app.eventStore = require('../../components/eventstore/memorystore/eventstore')();
	}

	var store = app.eventStore;
	var result = store.loadEvents(req.param('id'));

	res.json(result);
};
