'use strict';

import { ADD_WAYPOINT } from '../constants/action-types';

/**
 * Add geolocation data to the activeTrip.
 * The payload is pushed into the `activeTrip.waypoints` array.
 * @param {object} payload object with gelocation data
 * @return {object} processed by reducer to update `waypoints` array
 */
export const addWaypoint = (payload) => {
  return {
    type: ADD_WAYPOINT,
    payload
  };
}
