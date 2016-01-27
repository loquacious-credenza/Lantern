var Trip = require('../Models/trip.js');
var User = require('../Models/user.js');
var twilio = require('./twilio-methods.js');
var mail = require('./email-methods.js');
var cronJob = require('cron').CronJob;
var async = require('async');

// CALLS 'checkTrips' EVERY 30 SECONDS.
var job = new cronJob({
	cronTime: '*/30 * * * * *',
	onTick: function () {
		console.log("CronJob running!");
		checkTrips();
	},
	start: true
});

// CHECKS DATABASE PERIODICALLY FOR TRIPS THAT ARE BOTH EXPIRED AND ACTIVE. IF IT FINDS ONE, IT LOOKS UP
// THE USER ASSOCIATED WITH THE TRIP, AND THEN PASSES BOTH TO 'twilio' & 'mail'. IT THEN SETS THE TRIP'S 
// 'active' FIELD TO 'false'.
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
						//twilio(user, item);
						mail(user, item);
						item.active = false;
						item.save(function (err) {
							if (err) {
								console.log('Error saving change in trip status: ', err);
							}
						});
					}
					callback();
				});
			});
		}
	});
};


module.exports = job;