'use strict';

var { LOGIN, LOGOUT } = require('../config');

/**
 * The action dispatched on login
 * @return {object} Has the action type to modify `isLoggedIn` to true
 */
export var login = () => {
  return {
    type: LOGIN
  };
}

/**
 * The action dispatched on logout
 * @return {object} Has the action type to modify `isLoggedIn` to false
 */
export var logout = () => {
  return {
    type: LOGOUT
  };
}

/*=============================================================*/

var {
  ADD_START,
  ADD_DESTINATION,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_FAIL,
  ADD_ETA
} = require('../config');

/**
 * Adds a starting point to the activeTrip
 * @param  {object} payload An object with `latitude` (number) and `longitude`(number)
 * @return {object}         To be processed by reducer
 */
export var addStart = (payload) => {
  return {
    type: ADD_START,
    payload
  };
}

/**
 * Adds an ending point to the activeTrip.
 * Initiatates a search for valid destination via async network request.
 * Action will resolve to either success or fail.
 * @param  {object} payload A search query for location (address or geolocation)
 * @return {object}         To be processed by reducer
 */
export var addDestination = (payload) => {
  // This will need to do async stuff using redux thunk
  return {
    type: ADD_DESTINATION,
    payload
  };
}

/**
 * The action taken when the search for a destination comes back valid.
 * The payload will be processed by reducer to update
 * @param  {object} payload An object with `latitude` (number) and `longitude`(number)
 * @return {object}         processed by reducer to change activeTrip.destination
 */
export var addDestinationSuccess = (payload) => {
  return {
    type: ADD_DESTINATION_SUCCESS,
    payload
  };
}

/**
 * The action taken when the search for a destination comes back invalid.
 * @param  {object} payload payload is error object from async network request
 * @return {object}         set state of activeTrip.destination and clear form.
 */
export var addDestinationfail = (payload) => {
  return {
    type: ADD_DESTINATION_FAIL,
    payload
  };
}

/**
 * The action taken when the ETA field is filled in
 * @param  {object} payload object `endTime` property that is a date item occuring in future
 * @return {object}         processed by reducer and updating `activeTrip.endTime`
 */
export var addEta = (payload) => {
  return {
    type: ADD_ETA,
    payload
  };
}

/*=============================================================*/

var { ADD_WAYPOINT } = require('../config');

/**
 * Add geolocation data to the activeTrip.
 * The payload is pushed into the `activeTrip.waypoints` array.
 * @param {object} payload object with gelocation data
 * @return {object} processed by reducer to update `waypoints` array
 */
export var addWaypoint = (payload) => {
  return {
    type: ADD_WAYPOINT,
    payload
  };
}

/*=============================================================*/

var {
  START_TRIP,
  START_TRIP_SUCCESS,
  START_TRIP_FAIL,
  CHECK_IN,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAIL
} = require('./config');

/**
 * Action that happens when the `begin` is clicked.
 * Updates the state with payload
 * @param  {object} payload geolocation data. default is current location from device
 * @return {object}         action processed by reducer `user.onTrip`
 */
export var startTrip = (payload) => {
  // do send message to server.  Need to do action with thunk.
  return {
    type: START_TRIP,
    payload
  };
}


/**
 * The action returnd when server responds with success.
 * Accepts and forwards on the payload from `startTrip`
 * @param  {object} payload response object from server
 * @return {object}         actions taken after server response
 */
export var startTripSuccess = (payload) => {
  // on successful response from server
  return {
    type: START_TRIP_SUCCESS,
    payload
  };
}

/**
 * Action to use when server responds to startTrip with error.
 * Will change `user.onTrip` to false
 * @param  {object} payload contains error from server and boolean value in `onTrip` property
 * @return {object}         processed by reducer to revert `user.onTrip`
 */
export var startTripError = (payload) => {
  // on error response from server. Do cleanup
  return {
    type: START_TRIP_FAIL,
    payload
  };
}

/**
 * Action that fires when user clicks `check-in`.
 * Initiates an authenticate process.
 * Reducer may initiate loaders or user indication of async activity
 * @param  {object} payload contains final geolocation and timestamp
 * @return {object}         passed onto server and success
 */
export var checkIn = (payload) => {
  // initiate a transition to authenticated action
  // send a message to server
  return {
    type: CHECK_IN,
    payload
  };
}

/**
 * Action that occurs when server responds to `checkin` event
 * @param  {object} payload gets the payload from `checkin`
 * @return {object}         passes on to reducer
 */
export var checkInSuccess = (payload) => {
  // do stuff after the server successfully checks in
  return {
    type: CHECK_IN_SUCCESS,
    payload
  };
}

/**
 * Action that occurs when server fails to process `checkin` event.
 * Will attempt to retry connection with server.
 * @param  {object} payload the response from server and original geolocation object
 * @return {object}         processed by reducer
 */
export var checkInFail = (payload) => {
  // do stuff when the server did responded with error on authenticate
  return {
    type: CHECK_IN_FAIL,
    payload
  };
}

/*=============================================================*/

var {
  PASSED_ACCEPTABLE_DELAY,
  PASSED_ETA,
  RESET_DELAY,
  RESET_DELAY_SUCCESS,
  RESET_DELAY_FAIL
} = require('./config');

export var passedAcceptableDelay = (payload) => {
  return {
    type: PASSED_ACCEPTABLE_DELAY,
    payload
  };
}

export var passedEta = (payload) => {
  return {
    type: PASSED_ETA,
    payload
  };
}

export var resetDelay = (payload) => {
  return {
    type: RESET_DELAY,
    payload
  };
}

export var resetDelaySuccess = (payload) => {
  return {
    type: RESET_DELAY_SUCCESS,
    payload
  };
}

export var resetDelayFail = (payload) => {
  return {
    type: RESET_DELAY_FAIL,
    payload
  };
}

/*=============================================================*/

var {
  UPDATE_EMERGENCY_CONTACT,
  UPDATE_EMERGENCY_CONTACT_SUCCESS,
  UPDATE_EMERGENCY_CONTACT_FAIL
} = require('./config');

export var updateEmergencyContact = (payload) => {
  return {
    type: UPDATE_EMERGENCY_CONTACT,
    payload
  };
}

