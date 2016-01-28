'use strict';

import {
  AUTHENTICATE,
  AUTH_SUCCESS,
  AUTH_FAIL
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
