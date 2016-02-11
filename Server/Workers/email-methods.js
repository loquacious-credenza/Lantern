var nodemailer = require('nodemailer');
var auth = require('../ApiKeys/node-mailer.js');
var async = require('async');
var SERVER_URL = '10.8.32.155';
var SERVER_PORT = '8000';


var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: auth
});

// THIS FUNCTION TAKES A USER'S CONTACT LIST AND ITERATES THROUGH IT USING 'async'. IT FORMATS AN EMAIL FOR EACH CONTACT
// AND THEN SENDS IT USING 'nodemailer'. IT IS CURRENTLY FORMATTED TO USE A GMAIL ACCOUNT SPECIFIED IN AN 'ApiKeys' FILE.
module.exports = function (user, trip) {
	async.each(user.contacts, function (contact, callback) {
		var message = 'Hello, this is an automated message for ' + contact.contact_name + ' from Lantern '
		+ 'on behalf of ' + user.name + '. ' + user.name + ' was scheduled to arrive at ' + trip.overdue_time
		+ ' but failed to check in on time. Please consider contacting ' + user.name + ' at ' + user.phone + '\n'
		+ ' Visit http://' + SERVER_URL + ':' + SERVER_PORT + '/contact/' + trip.user_id + '/' + trip._id + ' for details.';
		var mailOptions = {
			from: 'Lantern Project <laudatoryflannel@gmail.com>',
			to: contact.contact_email,
			subject: 'An automated prompt sent on behalf of ' + user.name,
			text: message
		};
		transporter.sendMail(mailOptions, function (err, response) {
			if (err) {
				console.log('Error sending email: ', err);
			} else {
				console.log('Mail sent succsessfully to: ' + contact.contact_email);
			}
		});
	callback();
	});
};