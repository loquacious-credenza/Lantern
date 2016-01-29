'use strict';

import {
  LOAD_DELAY,
  LOAD_EMERGENCY_CONTACT
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