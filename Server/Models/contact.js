var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	contact_name: String,
	contact_email: String,
	contact_phone: String
});

module.exports = mongoose.model("Contact", ContactSchema);
