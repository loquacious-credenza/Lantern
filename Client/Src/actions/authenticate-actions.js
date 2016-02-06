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
}

export const authSuccess = (payload) => {
  return {
    type: AUTH_SUCCESS,
    payload
  };
}

export const authError = (payload) => {
  return {
    type: AUTH_FAIL,
    payload
  };
}

export const setPassword = (payload) => {
  return (dispatch) => {
    AsyncStorage.setItem('password',payload)
      .then((result) =>{

        return AsyncStorage.getItem('password')
      })
      .then((result) => {

        console.log('SET PASSWORD', result);
        return {
          type: SET_PASSWORD,
          payload
        };
      },
      (error) =>{
        console.log('THERE IS AN ERROR', error);
      });
  }
}