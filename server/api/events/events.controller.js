var app = require('../../app');


module.exports = function (eventstore) {


	return {
		show: function (req, res) {

			eventstore.loadEvents(req.param('id')).then(function(events){
				res.json(events);
			}, function(err) {
				res.json(err);
			});

		}
	}
};
