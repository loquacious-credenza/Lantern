'use strict';

import {extend} from 'lodash';

import {loadDelay, loadEmergencyContact} from './loading-actions';


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
  return (dispatch) => {
    fetch('http://localhost:8000/user/' + payload.id,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(responseBody)
    }).then( (response) => {
      var data = JSON.parse(response._bodyInit).user
      console.log("DATA", data.delay)
      dispatch(loginSuccess(data));
      console.log(loadDelay(data.delay));
      dispatch(loadDelay(data.delay));
      dispatch(loadEmergencyContact(data.contacts))
      if(data.activeTrip !== null){
        loadActiveTrip(true);
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
