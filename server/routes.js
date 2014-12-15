/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, config) {

	var eventStore = require('.' + config.eventstore)();

	// Insert routes below
	app.use('/api/sendcommand', require('./api/sendcommand')(eventStore));
	app.use('/api/getevents', require('./api/events')(eventStore));
	app.use('/api/games', require('./api/games')(eventStore));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function(req, res) {
			res.sendfile(app.get('appPath') + '/index.html');
		});
};
