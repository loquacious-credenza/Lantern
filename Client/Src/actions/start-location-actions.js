'use strict';

import {
  ADD_START,
  ADD_DESTINATION,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_FAIL,
  ADD_ETA
} from '../constants/action-types';

/**
 * Adds a starting point to the activeTrip
 * @param  {object} payload An object with `latitude` (number) and `longitude`(number)
 * @return {object}         To be processed by reducer
 */
export const addStart = (payload) => {
  console.log('STARTLOCATION', payload)
  return {
    type: ADD_START,
    payload
  };
}
