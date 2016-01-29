'use strict';

const {extend} = require('lodash');

const {
  GET_CURRENT_LOCATION,
  GET_CURRENT_LOCATION_SUCCESS,
  GET_CURRENT_LOCATION_FAIL
} = require('../constants/action-types');

const initialState = {
  latitude: null,
  longitude: null,
  timestamp: null,
  failedAttemptsToUpdate: 0
}

export default (state = initialState, {type,payload}) => {
  switch(type) {
    case GET_CURRENT_LOCATION:
      return state;
    case GET_CURRENT_LOCATION_SUCCESS:
      return extend({}, state, {
        latitude: payload.latitude,
        longitude: payload.longitude,
        timestamp: payload.timestamp,
        failedAttemptsToUpdate: 0
      });
    case GET_CURRENT_LOCATION_FAIL:
      return extend({}, state, {
        failedAttemptsToUpdate: state.failedAttemptsToUpdate+1
        // TO DO: Double check that this works
      })
    default:
      return state;
  }
}
