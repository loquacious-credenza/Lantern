'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoModel = require('./video').schema;
var LocPointModel = require('./loc-point').schema;

var tripSchema = new Schema({
  user_id: String,
  active: Boolean,
  destination: LocPointModel, //"destination": { "location": { "coordinates": [ -122.40906260000001(longitude), 37.783750399999995(latitude)] } }
  start_time: { type: Date, default: Date.now },
  overdue_time: Date,
  path: [ LocPointModel ],
  videos: [ VideoModel ]
});

module.exports = mongoose.model('Trip', tripSchema);
