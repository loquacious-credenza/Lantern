var express = require('express');
var Mongo = require('./Database/Db.js');
var app = express();
var port = process.env.PORT || 8000;


// SHOULD LATER INCORPORATE AUTH WHEN READY

// SHOULD LATER INCORPORATE ROUTES WHEN READY
// require(./Routes/routes.js)(app, express);

app.listen(port);
console.log("Listening on port: " + port);

module.exports = app;