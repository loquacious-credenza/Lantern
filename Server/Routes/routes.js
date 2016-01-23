

module.exports = function (app, express) {
/* =============== LOGIN ================= */
// LOGS THE USER IN USING FACEBOOK API, REDIRECTS TO EITHER 'create-route' OR 'current-route' SCREEN DEPENDING IF THE USER'S ACCOUNT ALREADY HAS
// AN ONGOING ROUTE ASSOCIATED WITH IT.
// POST - /LOGIN


/* =========== TRIP ENDPOINTS =========== */
// CREATES A TRIP
// POST -USER/USER_ID:/TRIPS/TRIP_ID
	app.post('/user/:user_id/:trip_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});

// GETS A TRIP
// GET -USER/USER_ID:/TRIPS/TRIP_ID
	app.get('/user/:user_id/:trip_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});

// UPDATES A TRIP'S GEOLOCATION DATA !OR! SOCKETS
// PUT -USER/USER_ID:/TRIPS/TRIP_ID !OR! SOCKETS
	app.put('/user/:user_id/:trip_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
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
		res.send('Arrived at endpoint: ' + req.url);
	});

// CREATE NEW CONTACTS
// POST -USER/USER_ID:
	app.post('/user/:user_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});

// UPDATES USER STATS
// PUT -/ID:/SETTINGS
	app.put('/user/:user_id', function (req, res) {
		res.send('Arrived at endpoint: ' + req.url);
	});
}




