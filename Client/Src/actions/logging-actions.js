'use strict';

import {
  LOGIN,
  LOGOUT
} from '../constants/action-types';

/**
 * The action dispatched on login
 * @return {object} Has the action type to modify `isLoggedIn` to true
 */
export const login = () => {
  return {
    type: LOGIN
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
