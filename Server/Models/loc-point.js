'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locPointSchema = new Schema({
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [ Number ]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
},
{
  noId: true
});

locPointSchema.index({ location: '2dsphere'});

module.exports = mongoose.model('LocPoint', locPointSchema);
