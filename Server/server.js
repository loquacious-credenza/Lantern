var express = require('express');
var Mongo = require('./Database/Db.js');
var app = express();
var port = process.env.PORT || 8000;


// AUTHENTICATION & MIDDLEWARE TO BE DECLARED IN 'config.js'
require('./Routes/config.js')(app, express);

// ROUTES & CONTROLLER CALLS TO BE DECLARED IN 'routes.js'
require('./Routes/routes.js')(app, express);

app.listen(port);
console.log("Listening on port: " + port);

module.exports = app;