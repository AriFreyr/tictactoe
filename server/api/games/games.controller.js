var app = require('../../app');


module.exports = function(eventstore) {
	return {
		index: function (req, res) {


			var result = eventstore.getKeys();

			res.json(result);
		}
	}
};
