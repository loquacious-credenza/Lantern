'use strict';

import {
  PASSED_ACCEPTABLE_DELAY,
  PASSED_ETA
} from '../constants/action-types';

/**
 * Action that fires when the ETA+delay has elapsed.
 * @param  {object} payload action that toggles `user.isOverdue`
 * @return {object}         processed by reducer
 */
export var passedAcceptableDelay = (payload) => {
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
export var passedEta = (payload) => {
  return {
    type: PASSED_ETA,
    payload
  };
}
