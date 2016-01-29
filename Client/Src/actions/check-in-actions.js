'use strict';

import {
  CHECK_IN
} from '../constants/action-types';

/**
 * Action that fires when user clicks `check-in`.
 * Initiates an authenticate process.
 * Reducer may initiate loaders or user indication of async activity
 * @param  {object} payload contains final geolocation and timestamp
 * @return {object}         passed onto server and success
 */
export const checkIn = (payload) => {
  // initiate a transition to authenticated action
  // send a message to server
  return {
    type: CHECK_IN
  };
}

// /**
//  * Action that occurs when server responds to `checkin` event
//  * @param  {object} payload gets the payload from `checkin`
//  * @return {object}         passes on to reducer
//  */
// export const checkInSuccess = (payload) => {
//   // do stuff after the server successfully checks in
//   return {
//     type: CHECK_IN_SUCCESS,
//     payload
//   };
// }

// *
//  * Action that occurs when server fails to process `checkin` event.
//  * Will attempt to retry connection with server.
//  * @param  {object} payload the response from server and original geolocation object
//  * @return {object}         processed by reducer
 
// export const checkInFail = (payload) => {
//   // do stuff when the server did responded with error on authenticate
//   return {
//     type: CHECK_IN_FAIL,
//     payload
//   };
// }