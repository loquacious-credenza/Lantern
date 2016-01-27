'use strict';

var {combineReducers} = require('redux');

export default combineReducers({
  currentLocation: require('./current-location')
})
