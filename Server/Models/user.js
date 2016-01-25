var mongoose = require('mongoose');
var ContactSchema = require('./contact.js').schema;
var TripSchema = require('./trip.js').schema;

var UserSchema = new mongoose.Schema({
	_id: String,
	name: String,
	phone: Number,
	delay: Number,
	contacts: [ContactSchema],
	trips: [ String ]
});

module.exports = mongoose.model("User", UserSchema);
