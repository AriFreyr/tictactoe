var app = require('../../app');


module.exports = function (eventstore) {


	return {
		show: function (req, res) {

			var result = eventstore.loadEvents(req.param('id'));

			res.json(result);
		}
	}
};
