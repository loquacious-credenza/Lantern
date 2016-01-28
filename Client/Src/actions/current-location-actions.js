'use strict';

import {
  GET_CURRENT_LOCATION,
  GET_CURRENT_LOCATION_SUCCESS,
  GET_CURRENT_LOCATION_FAIL
} from '../constants/action-types';

/**
 * Action fired when the geolocation is being updated from device.
 * @param  {object} payload action type
 * @return {object}         action object for `user.currentLocation`
 */
// import * as types from './actionTypes';

export const getCurrentLocation = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(getCurrentLocationSuccess({
              longitude:position.coords.longitude,
              latitude:position.coords.latitude,
              timestamp:position.timestamp
            }));
      },
      (error) => dispatch(getCurrentLocationFail(error.message)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

/**
 * Action fired when a request for geolocation is successful.
 * @param  {object} payload contains geolocation latitude, longitude, timestamp
 * @return {object}         action object for `currentLocation` reducer
 */
export const getCurrentLocationSuccess = (payload) => {
  return {
    type: GET_CURRENT_LOCATION_SUCCESS,
    payload
  };
}

/**
 * Action fired when geolocation cannot be read from device
 * Should retry getting location and return message to user after x time.
 * @param  {object} payload contains error msg
 * @return {object}         object processed by `currentLocation` reducer
 */
export var getCurrentLocationFail = (payload) => {
  return {
    type: GET_CURRENT_LOCATION_FAIL,
    payload
  };
}
