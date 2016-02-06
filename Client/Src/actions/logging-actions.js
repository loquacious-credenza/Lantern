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

  return (dispatch) => {
    console.log('LOGIN ACTION')
    fetch('http://localhost:8000/user/' + payload.id,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(responseBody)
    }).then( (response) => {
      var data = JSON.parse(response._bodyInit);
      console.log('IN RESPONSE', data);
      dispatch(loginSuccess(data.user));
      dispatch(loadDelay(data.user.delay));
      dispatch(loadEmergencyContact(data.user.contacts))
      // if(payload.onTrip && data.activeTrip !== null){
      //   dispatch(loadActiveTrip({
      //     id: data.activeTrip._id,
      //     startTime: data.activeTrip.start_time,
      //     eta: data.activeTrip.eta,
      //     overdueTime: data.activeTrip.overdue_time,
      //     origin: data.activeTrip.origin,
      //     destination: data.activeTrip.destination,
      //     waypoints: data.activeTrip.path,
      //     videos: data.activeTrip.videos
      //   }));
      // }
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
