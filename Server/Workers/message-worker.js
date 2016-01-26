var Trip = require('../Models/trip.js');
var User = require('../Models/user.js');
var cronJob = require('cron').CronJob;
var async = require('async');

var job = new cronJob({
	cronTime: '*/20 * * * * *',
	onTick: function () {
		console.log("CronJob running!");
		checkTrips();
	},
	start: true
});

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
						pingTwilio(user, item);
					}
					console.log('Callback reached!');
					callback();
				});
			});
		}
	});
};

var pingTwilio = function (user, trip) {
	console.log('User: ' + user + '\n');
	console.log('Trip: ' + trip + '\n');
}

module.exports = job;