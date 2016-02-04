

var moment = require('moment');

import {addStart, addDestination, addEta} from './'

import {
  START_TRIP_SUCCESS,
  START_TRIP_FAIL,

} from '../constants/action-types';

/**
 * Action that happens when the `begin` is clicked.
 * Updates the state with payload
 * @param  {object} payload geolocation data. default is current location from device
 * @return {object}         action processed by reducer `user.onTrip`
 */
// PAYLOAD LOOKS LIKE THIS
/*
{
  id:
  origin:{
    latitude:
    longitude
  },
  destination:{
    latitude:
    longitude
  },
  eta:,
  acceptableDelay:
}
*/

export const startTrip = (payload) => {
  // do send message to server.  Need to do action with thunk.
  var responseBody = {}
  responseBody.user_id = payload.id
  responseBody.origin = payload.origin
  responseBody.destination = payload.destination
  responseBody.startTime = moment().format();
  responseBody.eta = moment(responseBody.startTime).add(parseInt(payload.etaValue), 'minutes').format()
  responseBody.overdueTime = moment(responseBody.eta).add(parseInt(payload.acceptableDelay), 'minutes').format() // CALCULATE DELAY HERE
  return (dispatch) => {
    console.log("got here")
    fetch('http://localhost:8000/user/' + payload.id +'/trips',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(responseBody)
    }).then( (response) => {
      dispatch(startTripSuccess({
          id: JSON.parse(response._bodyInit)._id,
          startTime: responseBody.startTime,
          eta: responseBody.eta,
          overdueTime: responseBody.overdueTime,
          origin: payload.origin,
          destination: payload.destination,
          waypoints: []
        }));
    })
  }
}


/**
 * The action returnd when server responds with success.
 * Accepts and forwards on the payload from `startTrip`
 * @param  {object} payload response object from server
 * @return {object}         actions taken after server response
 */


 //PAYLOAD LOOKS LIKE THIS 
 //  {
 //    id: null,
 //    startTime: null,
 //    eta: null,
 //    overdueTime: null,
 //    origin: {},
 //    destination: {},
 //    waypoints: []
 //  };

export const startTripSuccess = (payload) => {
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
export const startTripError = (payload) => {
  // on error response from server. Do cleanup
  return {
    type: START_TRIP_FAIL,
    payload
  };
}
