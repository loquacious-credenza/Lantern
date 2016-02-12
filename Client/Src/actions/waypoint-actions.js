'use strict';

import { ADD_WAYPOINT, CONFIRM_IN_RANGE } from '../constants/action-types';

import {
  SERVER_URL,
  SERVER_PORT
} from '../constants/network';

/**
 * Add geolocation data to the activeTrip.
 * The payload is pushed into the `activeTrip.waypoints` array.
 * @param {object} payload object with gelocation data
 * @return {object} processed by reducer to update `waypoints` array
 */
export const addWaypoint = (payload, id) => {
  var requestBody = {location:{coordinates:[payload.longitude, payload.latitude]}};
  return (dispatch) => {
    fetch(`${SERVER_URL}${SERVER_PORT}/user/${id}/trip`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    }).then( (response) => {
      // Do something with the server response?
      dispatch(addWaypointSuccess(payload))
      console.log(response)
    } ).catch((err) => {
      console.log("Error",err)
    })
  }
}

export const addWaypointSuccess = (payload) => {
 return {
     type: ADD_WAYPOINT,
     payload
   };
 }

export const confirmInRange = () => {
  console.log('confirming in range!');
  return {
    type: CONFIRM_IN_RANGE
  }
}
