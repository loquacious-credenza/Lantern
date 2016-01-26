var Trip = require('../Models/trip.js');
var User = require('../Models/user.js');
var twilio = require('./twilio-methods.js');
var cronJob = require('cron').CronJob;
var async = require('async');

// CALLS 'checkTrips' EVERY 20 SECONDS.
var job = new cronJob({
	cronTime: '*/20 * * * * *',
	onTick: function () {
		console.log("CronJob running!");
		checkTrips();
	},
	start: true
});

// CHECKS DATABASE PERIODICALLY FOR TRIPS THAT ARE BOTH EXPIRED AND ACTIVE. IF IT FINDS ONE, IT LOOKS UP
// THE USER ASSOCIATED WITH THE TRIP, AND THEN PASSES BOTH TO 'pingTwilio'.
var checkTrips = function () {
	var currentTime = Date.now();
	Trip.find({active:true, overdue_time: {$lt: currentTime}}, '-video -active', function (err, trips) {
		if (err) {
			console.log('Error checking for expired trips: ', err);
		} else if (trips.length > 0) {
			async.each(trips, function (item, callback) {
				User.findById(item.user_id, 'name phone contacts', function (err, user) {
					if (err) {
						console.log('Error checking for user associated with an expired trip: ', err);
					} else if (user !== null) {
						twilio(user, item);
					}
					callback();
				});
			});
		}
	});
};


module.exports = job;