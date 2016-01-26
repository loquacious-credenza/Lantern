var bodyParser = require('body-parser');

// UNCOMMENTING THIS LINE WILL POPULATE DB WITH FAKE USERS/TRIPS
//var dummy = require('../_dummy-data.js');

// UNCOMMENTING THIS LINE WILL BEGIN CRON JOB THAT CHECKS FOR EXPIRED & ACTIVE TRIPS
//var messageWorker = require('../Workers/message-worker.js');

module.exports = function (app, express) {
	app.use(bodyParser.json());
	
}