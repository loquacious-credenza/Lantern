var mongoose = require('../Database/db.js');
var TripSchema = require('./trip.js');

var ContactSchema = new mongoose.Schema({
	contact_name: String,
	contact_email: String,
	contact_phone: Number
}, {
	noId: true
});

var UserSchema = new mongoose.Schema({
	user_id: String,
	name: String,
	phone: Number,
	delay: Number,
	contacts: [ContactSchema],
	trip: [TripSchema];
});

module.exports = mongoose.model("User", UserSchema);