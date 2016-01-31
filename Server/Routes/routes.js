var UserMethods = require('../Controllers/user-controller.js');
var TripMethods = require('../Controllers/trip-controller.js');
var path = require('path');


module.exports = function (app, express) {
/* =============== LOGIN ================= */
// LOGS THE USER IN USING FACEBOOK API, REDIRECTS TO EITHER 'create-route' OR 'current-route' SCREEN DEPENDING IF THE USER'S ACCOUNT ALREADY HAS
// AN ONGOING ROUTE ASSOCIATED WITH IT.
// POST - /LOGIN


/* =========== TRIP ENDPOINTS =========== */
// CREATES A TRIP
// POST -USER/USER_ID:/TRIPS/TRIP_ID
	app.post('/users/:user_id/trips', function (req, res) {
    TripMethods.create(req, res);
	});

// GETS A TRIP
// GET -USER/USER_ID:/TRIPS/TRIP_ID
	app.get('/user/:user_id/:trip_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});

// UPDATES A TRIP'S GEOLOCATION DATA !OR! SOCKETS
// PUT -USER/USER_ID:/TRIPS/TRIP_ID !OR! SOCKETS
	app.put('/user/:user_id/trip/:trip_id', function (req, res) {
		//res.send('Arrived at endpoint: ' + req.url);
		TripMethods.addLocPoints(req.params.trip_id, req.body, res);
	});

// MARKS A TRIP AS 'active: false'
// DELETE -USER/USER_ID:/TRIPS/TRIP_ID
	app.delete('/user/:user_id/:trip_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});

/* ================ USER ENDPOINTS ================ */
// GET USER STATS
// GET -USER/USER_ID:
	app.get('/user/:user_id', function (req, res) {
		//res.send('Arrived at endpoint: ' + req.url);
		UserMethods.findUser(req.params.user_id, res);
	});

// CREATE NEW CONTACTS
// POST -USER/USER_ID:
	app.post('/user/:user_id', function (req, res) {
		//res.send('Arrived at endpoint: ' + req.url);
		UserMethods.findOrCreateUser(req.body, res);
	});

// UPDATES USER STATS
// PUT -/ID:/SETTINGS
	app.put('/user/:user_id', function (req, res) {
    console.log('USERID',req.params.user_id);
    UserMethods.update(req.params.user_id, req.body.prop, req.body.data, res);
	});
  app.put('/user/:user_id/contacts', function (req, res) {
    //res.send('Arrived at endpoint: ' + req.url);
    UserMethods.updateContacts(req.params.user_id, req.body, res);
  });

/* ================ CONTACT ENDPOINTS ================= */
	app.get('/userpath/:user_id/:trip_id', function (req, res) {
		TripMethods.read(req, res);
	});

	app.get('/userpath/:user_id/:trip_id/user', function (req, res) {
		UserMethods.findUser(req.params.user_id, res);
	});
}





