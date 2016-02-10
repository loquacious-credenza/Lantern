//var twilioKeys = require('../ApiKeys/twilio.js');
//var twilio = require('twilio')(twilioKeys.ACCOUNT_SID, twilioKeys.AUTH_TOKEN);
var async = require('async');

// THIS FUNCTION TAKES A USER'S CONTACT LIST AND SENDS AN SMS TO EACH CONTACT USING THE TWILIO API.
module.exports = function (user, trip) {
	async.each(user.contacts, function (contact, callback) {
		var message = 'Hello, this is an automated message for ' + contact.contact_name + ' from Lantern '
		+ 'on behalf of ' + user.name + '. ' + user.name + ' was scheduled to arrive at ' + trip.overdue_time
		+ ' but failed to check in on time. Please consider contacting ' + user.name + ' at ' + user.phone +
		' Visit http://localhost:8000/contact/' + trip.user_id + '/' + trip._id + ' for details.';
		twilio.sendMessage ({
			to: '+' + contact.contact_phone,
			from: twilioKeys.NUMBER,
			body: message
		}, function (err, result) {
			if (err) {
				console.log('Error using twilio: ', err);
			} else {
				console.log('Message sent successfully.');
			}
			callback();
		});
	});
};
