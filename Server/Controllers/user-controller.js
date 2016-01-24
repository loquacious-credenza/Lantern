var User = require('../Models/user.js');

module.exports = {
	findUser: function (id, res) {
		User.getOne(id, function (err, response) {
			if (err) {
				console.log("Error finding user: ", err);
				res.sendStatus(500);
			} else {
				res.json(response);
			}
		});
	};
}