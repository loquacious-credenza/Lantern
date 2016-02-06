'use strict';

import {
  LOAD_DELAY,
  LOAD_EMERGENCY_CONTACT,
  LOAD_ACTIVE_TRIP
} from '../constants/action-types';

export const loadDelay = (payload) => {
  return {
    type: LOAD_DELAY,
    payload
  };
};

export const loadEmergencyContact = (payload) => {
  return {
    type: LOAD_EMERGENCY_CONTACT,
    payload
  };
};

export const loadActiveTrip = (payload) => {
  return {
    type: LOAD_ACTIVE_TRIP,
    payload
  };
};
