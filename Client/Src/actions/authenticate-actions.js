// NOT BEING USED CURRENTLY
// !MVP
'use strict';

import {
  AsyncStorage
} from 'react-native';

import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_PASSWORD
} from '../constants/action-types';

export const authenticate = (payload) => {
  return {
    type: AUTHENTICATE,
    payload
  };
};

export const authSuccess = (payload) => {
  return {
    type: AUTH_SUCCESS,
    payload
  };
};

export const authError = (payload) => {
  return {
    type: AUTH_FAIL,
    payload
  };
};

export const setPassword = (payload) => {
  return (dispatch) => {
    dispatch({
        type: SET_PASSWORD,
        payload
    });
    // turn on spinner for network activity if implemented (NEED TO CREATE ACTION and State for this)
    fetch(`http://localhost:8000/user/${payload.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        prop: 'password',
        data: payload.password
      })
    })
    .then((response) => {
      // turn off spinner if implemented
      return AsyncStorage.setItem('password', JSON.stringify(payload.password))
    })
    .catch((error) => {
      // Need to handle error.
      // RETRY submission.
      // Save Preference
      // Reset state
      // Notify User.
    })
  }
};
