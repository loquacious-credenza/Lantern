'use strict';

import {
  CHECK_IN,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAIL
} from '../constants/action-types';

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
