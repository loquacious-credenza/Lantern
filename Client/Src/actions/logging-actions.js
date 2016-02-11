'use strict';

import {extend} from 'lodash';

import {
  loadDelay,
  loadEmergencyContact,
  loadActiveTrip
} from './loading-actions';


import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/action-types';

import {
  SERVER_URL,
  SERVER_PORT
} from '../constants/network';

// var rest = require('rest')
/**
 * The action dispatched on login
 * @return {object} Has the action type to modify `isLoggedIn` to true
 */

 // payload looks like this {name: , id: }
export const login = (payload) => {
 // TODO: CONFIRM FORMAT
  var responseBody = {}
  responseBody._id = payload.id;
  responseBody.name = payload.name;
  responseBody.onTrip = payload.onTrip;
  responseBody.password = payload.password;

  console.log('JUST BEFORE FETCH', payload);
  return (dispatch) => {
    fetch(`${SERVER_URL}:${SERVER_PORT}/user/${payload.id}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(responseBody)
    }).then( (response) => {
      var data = JSON.parse(response._bodyInit);
      console.log('GOT RESPONSE FROM SERVER', data);
      dispatch(loginSuccess(data.user));
      dispatch(loadDelay(data.user.delay));
      dispatch(loadEmergencyContact(data.user.contacts))
      if(payload.onTrip && data.activeTrip !== null){
        var markers = [
          {coordinate: {
            latitude: data.activeTrip.origin.location.coordinates[0],
            longitude: data.activeTrip.origin.location.coordinates[1],
            },
           key: 0,
           id: 'origin',
          },{coordinate: {
            latitude: data.activeTrip.destination.location.coordinates[0],
            longitude: data.activeTrip.destination.location.coordinates[1],
            },
           key: 1,
           id: 'destination',
          }
        ];


        console.log('LOGIN action', data.activeTrip);
        dispatch(loadActiveTrip({
          id: data.activeTrip._id,
          startTime: data.activeTrip.start_time,
          eta: data.activeTrip.eta,
          overdueTime: data.activeTrip.overdue_time,
          origin: data.activeTrip.origin,
          destination: data.activeTrip.destination,
          waypoints: data.activeTrip.path,
          videos: data.activeTrip.videos,
          markers: markers,
          stage: 'tracking',
          description: 'Currently Tracking your Location',
        }));
      }
      //EXPECTED RESPONSE:
      //{_id , name: , activeTrip, contacts}

    }).catch( (err) => {
      // loginFail(err);
    })
  }
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};



// export const loginFail = (payload) => {
//   return {
//     type: LOGIN_FAIL,
//     payload
//   };
// }
// *
//  * The action dispatched on logout
//  * @return {object} Has the action type to modify `isLoggedIn` to false

// export const logout = () => {
//   return {
//     type: LOGOUT
//   };
// }
