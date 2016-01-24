'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoModel = require('./video').schema;
var LocPointModel = require('./loc-point').schema;

var tripSchema = new Schema({
  destination: LocPointModel,
  start_time: { type: Date, default: Date.now },
  overdue_time: Date,
  path: [ LocPointModel ],
  videos: [ VideoModel ]
});

module.exports = mongoose.model('Trip', tripSchema);
