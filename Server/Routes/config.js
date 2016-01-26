var bodyParser = require('body-parser');
var messageWorker = require('../Workers/message-worker.js');

module.exports = function (app, express) {
	app.use(bodyParser.json());
	
}