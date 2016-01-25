var bodyParser = require('body-parser');

module.exports = function (app, express) {
	app.use(bodyParser.json());
	
}