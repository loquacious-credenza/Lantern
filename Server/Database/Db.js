var mongoose = require('mongoose');
var Mongo = require('../ApiKeys/mongolab.js') || 'not available';
var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
	mongoose.connect('mongodb://localhost:8000/development');
} else {
	mongoose.connect(Mongo.MONGO_URL);
};

module.exports = mongoose;