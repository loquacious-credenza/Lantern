var User = require('../Models/user.js');

module.exports = {
	//FINDS 'user' BY ID AND RETURNS JSON
	findUser: function (id, res) {
		User.findById(id, function (err, response) {
			if (err) {
				console.log("Error finding user: ", err);
				res.sendStatus(500);
			} else {
				res.json(response);
			}
		});
	},
	// SEARCHES FOR 'user' BY ID INCLUDED IN 'userObj'. IF 'user' IS FOUND, IT IS RETURNED.
	// IF NOT, 'user' IS CREATED IN THE DATABASE USING 'userObj' AND THEN RETURNED
	findOrCreateUser: function (userObj, res) {
		User.findById(userObj._id, function (err, response) {
			if (err) {
				console.log("Error finding user: ", err);
				res.sendStatus(500);
			} else if (response !== null) {
				res.json(response);
			} else {
				User.create(userObj, function (err, response) {
					if (err) {
						console.log("Error creating user: ", err);
						res.sendStatus(500);
					} else {
						res.json(response);
					}
				});
			}
		});
	},
	// SEARCHES FOR USER BY 'id' AND UPDATES CONTACTS USING 'contactsArr'. 'contactsArr' MUST
	// BE AN ARRAY OF VALUES MATCHING THE SCHEMA OUTLINED IN 'contact.js'.
	updateContacts: function (id, contactsArr, res) {
		User.findByIdAndUpdate(id, {$set: {contacts: contactsArr}}, function (err, response) {
			if (err) {
				console.log("Error updating user contacts: ", err);
				res.sendStatus(500);
			} else {
				res.json(response);
			}
		});
	}

}




