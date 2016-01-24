var mongoose = require('mongoose');
// var Mongo = require('../ApiKeys/mongolab.js');
var env = process.env.NODE_ENV || 'development';
var User = require('../Models/user.js');

var Trip = require('../Models/trip');
var Video = require('../Models/video');
var LocPointModel = require('./loc-point');

if(env === 'development'){
	mongoose.connect('mongodb://localhost:27017/lantern');
} else {
	mongoose.connect(Mongo.MONGO_URL);
};

module.exports = mongoose;
