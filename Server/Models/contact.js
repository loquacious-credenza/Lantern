var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	contact_name: String,
	contact_email: String,
	contact_phone: String
}, {
	noId: true
});

module.exports = mongoose.model("Contact", ContactSchema);
