var express = require('express');
var Mongo = require('./Database/Db.js');
var app = express();
var port = process.env.PORT || 8000;


// AUTHENTICATION & MIDDLEWARE
//require('./Routes/config.js')(app, express);

// ROUTES
require('./Routes/routes.js')(app, express);

app.listen(port);
console.log("Listening on port: " + port);

module.exports = app;