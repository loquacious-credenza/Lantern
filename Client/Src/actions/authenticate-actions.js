'use strict';

import {
  AUTHENTICATE,
  AUTH_SUCCESS,
  AUTH_FAIL
} from '../constants/action-types';

export var authenticate = (payload) => {
  return {
    type: AUTHENTICATE,
    payload
  };
}

export var authSuccess = (payload) => {
  return {
    type: AUTH_SUCCESS,
    payload
  };
}

export var authError = (payload) => {
  return {
    type: AUTH_FAIL,
    payload
  };
}
