var mongoose = require('mongoose');
var Mongo = require('../ApiKeys/mongolab.js');
var env = process.env.NODE_ENV || 'development';
var User = require('../Models/user.js');

if(env === 'development'){
	mongoose.connect('mongodb://localhost:27017/lantern');
} else {
	mongoose.connect(Mongo.MONGO_URL);
};

module.exports = mongoose;