'use strict';

import {
  ADD_DESTINATION,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_FAIL
} from '../constants/action-types';

/**
 * Adds an ending point to the activeTrip.
 * Initiatates a search for valid destination via async network request.
 * Action will resolve to either success or fail.
 * @param  {object} payload A search query for location (address or geolocation)
 * @return {object}         To be processed by reducer
 */
export var addDestination = (payload) => {
  // This will need to do async stuff using redux thunk
  return {
    type: ADD_DESTINATION,
    payload
  };
}

/**
 * The action taken when the search for a destination comes back valid.
 * The payload will be processed by reducer to update
 * @param  {object} payload An object with `latitude` (number) and `longitude`(number)
 * @return {object}         processed by reducer to change activeTrip.destination
 */
export var addDestinationSuccess = (payload) => {
  return {
    type: ADD_DESTINATION_SUCCESS,
    payload
  };
}

/**
 * The action taken when the search for a destination comes back invalid.
 * @param  {object} payload payload is error object from async network request
 * @return {object}         set state of activeTrip.destination and clear form.
 */
export var addDestinationFail = (payload) => {
  return {
    type: ADD_DESTINATION_FAIL,
    payload
  };
}
