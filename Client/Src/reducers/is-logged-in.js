'use strict';

const {extend} = require('lodash');

const {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    LOGOUT
} = require('../constants/action-types');

const initialState = {
  id: null,
  name: null,
  isLoggedIn: false,
  onTrip: false,
  isOverdue: false,
  acceptableDelay: null,
  emergencyContacts: [],
  activeTrip: null 
}

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return extend({}, state, {
        id: payload.id,
        name: payload.name,
        isLoggedIn: true,
        onTrip: payload.onTrip,
        isOverdue: payload.isOverdue,
        acceptableDelay: payload.acceptableDelay,
        emergencyContacts: payload.emergencyContacts,
        activeTrip: payload.activeTrip
      });
    default:
        return state;
  }
}