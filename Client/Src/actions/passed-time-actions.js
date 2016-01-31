'use strict';

import {
  SET_PASSED_TIME_DELAY,
  PASSED_ACCEPTABLE_DELAY,
  PASSED_ETA
} from '../constants/action-types';

/**
 * Action fired from settings to update the user time delay preference
 * updates the `user.acceptableDelay` property on state
 * Needs to update server with new value
 * @param  {object} payload has signature `{acceptableDelay: Number}`
 * @return {object}         signature `{ type : SET_PASSED_TIME_DELAY`, payload: payload }`
 */
export const setPassedTimeDelay = (payload) => {
  return (dispatch) => {
    dispatch(setPassedTimeDelaySuccess(payload));
    // turn on spinner for network activity if implemented (NEED TO CREATE ACTION and State for this)
    fetch(`http://localhost:8000/user/${payload.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        prop: 'delay',
        data: payload.delay
      })
    })
    .then((response) => {
      // turn off spinner if implemented
    })
    .catch((error) => {
      // Need to handle error.
      // RETRY submission.
      // Save Preference
      // Reset state
      // Notify User.
    })
  }
}

export const setPassedTimeDelaySuccess = (payload) => {
  return {
          type: SET_PASSED_TIME_DELAY,
          payload: payload
        }
}

/**
 * Action that fires when the ETA+delay has elapsed.
 * @param  {object} payload action that toggles `user.isOverdue`
 * @return {object}         processed by reducer
 */
export const passedAcceptableDelay = (payload) => {
  return {
    type: PASSED_ACCEPTABLE_DELAY,
    payload
  };
}

/**
 * Action that fires when ETA time has elapsed and checkin has not occured.
 * Should change the view to be red.
 * @param  {object} payload contains boolean  `false` to toggle `user.isOverdue`
 * @return {object}         processed by reducer to change `user.isOverdue` to false
 */
export const passedEta = (payload) => {
  return {
    type: PASSED_ETA,
    payload
  };
}
