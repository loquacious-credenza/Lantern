'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocPointModel = require('./loc-point').schema;

var videoSchema = new Schema({
  url: String,
  location: LocPointModel,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
