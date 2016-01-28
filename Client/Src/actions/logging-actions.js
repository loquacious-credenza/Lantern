'use strict';

import {extend} from 'lodash';

import {
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../constants/action-types';

// var rest = require('rest')
/**
 * The action dispatched on login
 * @return {object} Has the action type to modify `isLoggedIn` to true
 */
export const login = (payload) => {
    var userId = payload._id // TODO: CONFIRM FORMAT
  return (dispatch) => {
    fetch({
      path: 'http://localhost:8000/user/' + userId,
      method: 'POST',
      body: payload //TODO: EVALUATE PAYLOAD DATA
    }).then( (response) => {
      loginSuccess(extend({},response,{isOverdue:false})); // TO DO: FIGURE THIS OUT
    }).catch( (err) => {
      loginFail(err);
    });
  }
  return {
    type: LOGIN
  }
}

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}

export const loginFail = (payload) => {
  return {
    type: LOGIN_FAIL,
    payload
  };
}
/**
 * The action dispatched on logout
 * @return {object} Has the action type to modify `isLoggedIn` to false
 */
export const logout = () => {
  return {
    type: LOGOUT
  };
}
