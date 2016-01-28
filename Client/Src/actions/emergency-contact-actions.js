'use strict';

import {
  UPDATE_EMERGENCY_CONTACT,
  UPDATE_EMERGENCY_CONTACT_SUCCESS,
  UPDATE_EMERGENCY_CONTACT_FAIL
} from '../constants/action-types';

/**
 * Action that sends updated contacts back to server.
 * This method sends the entire contacts array (5 items)
 * @param  {object} payload the new array of contacts
 * @return {object}         reducer will update state
 */
export const updateEmergencyContact = (payload) => {
  return {
    type: UPDATE_EMERGENCY_CONTACT,
    payload
  };
}

/**
 * Action that occurs when the server has updated contacts
 * A message can notify user that contact updates were saved.
 * @param  {object} payload server response and msg to user
 * @return {object}         action object will notify user of success.
 */
export const updateEmergencyContactSuccess = (payload) => {
  return {
    type: UPDATE_EMERGENCY_CONTACT_SUCCESS,
    payload
  };
}

/**
 * Action that occurs when server cannot update contacts
 * @param  {object} payload payload is contacts object for retry attempts
 * @return {object}         action object for `user.emergencyContacts` reducer
 */
export const updateEmergencyContactFail = (payload) => {
  return {
    type: UPDATE_EMERGENCY_CONTACT_FAIL,
    payload
  };
}
