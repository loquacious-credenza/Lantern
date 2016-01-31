'use strict';

const {extend} = require('lodash');

const {
    LOGIN_SUCCESS,
    LOGOUT,
    UPDATE_EMERGENCY_CONTACT,
    UPDATE_ACCEPTABLE_DELAY,
    RESET_DELAY,
    PASSED_ETA,
    SET_PASSED_TIME_DELAY,
    PASSED_ACCEPTABLE_DELAY,
    LOAD_DELAY,
    LOAD_EMERGENCY_CONTACT
} = require('../constants/action-types');

const initialState = {
  id: null,
  name: null,
  isLoggedIn: false,
  acceptableDelay: 15,
  emergencyContacts: [],
  onTrip: false,
  isPastETA: false,
  isOverdue: false
};

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case LOGIN_SUCCESS:
      return extend({}, state, {
        id: payload._id,
        name: payload.name,
        isLoggedIn: true,
      });
    case LOGOUT:
      return initialState;
    case LOAD_EMERGENCY_CONTACT:
      return extend({}, state, {
        emergencyContacts: payload
      });
    case LOAD_DELAY:
      return extend({}, state, {
        acceptableDelay: payload
      });
    case UPDATE_EMERGENCY_CONTACT:
      return extend({}, state, {
        emergencyContacts: state.emergencyContacts.concat([payload])
      });
    case UPDATE_ACCEPTABLE_DELAY:
      return extend({}, state, {
        acceptableDelay: payload
      });
    case RESET_DELAY:
      return extend({}, state, {
        isPastETA: false
      });
    case PASSED_ETA:
      return extend({}, state, {
        isPastETA: true
      });
    case SET_PASSED_TIME_DELAY:
    console.log("GOT HERE", payload);
      return extend({}, state, {
        acceptableDelay: payload
      })
    case PASSED_ACCEPTABLE_DELAY:
      return extend({}, state, {
        isOverdue: true
      });
    default:
        return state;
  };
};
