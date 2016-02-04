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
  console.log('GOT TO THE LOAD_ACTIVE_TRIP action', payload);
  return {
    type: LOAD_ACTIVE_TRIP,
    payload
  };
};
