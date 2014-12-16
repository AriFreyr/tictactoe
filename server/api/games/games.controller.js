var app = require('../../app');


module.exports = function(eventstore) {
	return {
		index: function (req, res) {


			eventstore.getKeys().then(function(ids){
				res.json(ids);
			}, function(err){
				res.json(err);
			});
		}
	}
};
