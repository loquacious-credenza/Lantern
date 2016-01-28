'use strict';

import {
  RESET_DELAY,
  RESET_DELAY_SUCCESS,
  RESET_DELAY_FAIL
} from '../constants/action-types';

/**
 * Action fired when the ETA is to be reset to the current time.
 * This effectively allows the delay to run again like snooze.
 * This initatiates a request to server to reset activeTrip.endTime.
 * @param  {object} payload contains new Date value for `activeTrip.endTime`
 * @return {object}         processed by reducers for `user.isOverdue` and `activeTrip.endTime`
 */
export const resetDelay = (payload) => {
  return {
    type: RESET_DELAY,
    payload
  };
}

/**
 * Action that occurs on successful response from server
 * @param  {object} payload server response and original payload from `resetDelay`
 * @return {object}         reducer will return current state
 */
export const resetDelaySuccess = (payload) => {
  return {
    type: RESET_DELAY_SUCCESS,
    payload
  };
}

/**
 * Action fired when there is a problem sending the resetDelay message to server.
 * The network request should retry with payload.
 * @param  {object} payload the new `activeTrip.endTime` date value
 * @return {object}         action object that can message user or revert state
 */
export const resetDelayFail = (payload) => {
  return {
    type: RESET_DELAY_FAIL,
    payload
  };
}
