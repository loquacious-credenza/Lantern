'use strict';

import {
  ADD_EMERGENCY_CONTACT,
  ADD_EMERGENCY_CONTACT_SUCCESS,
  ADD_EMERGENCY_CONTACT_FAIL,
  UPDATE_EMERGENCY_CONTACT_SUCCESS,
  UPDATE_EMERGENCY_CONTACT_FAIL,
  UPDATE_EMERGENCY_CONTACT
} from '../constants/action-types';

/**
 * Action that sends updated contacts back to server.
 * This method sends the entire contacts array (5 items)
 * @param  {object} payload the new array of contacts
 * @return {object}         reducer will update state
 */
// export const updateEmergencyContact = (payload) => {
//   var requestBody = payload.existingContacts
//     .slice(0, payload.index)
//     .concat([{
//       contact_name:payload.name,
//       contact_phone:payload.phone,
//       contact_email:payload.email
//     }])
//     .concat(payload.existingContacts.slice(payload.index + 1));

//   return (dispatch) => {
//     fetch('http://localhost:8000/user/' + payload.id + '/contact/' + payload.index, //new route
//       {
//       method: 'PUT',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(requestBody)
//     })
//     .then((response) => {
//       dispatch(updateEmergencyContactSuccess(response))
//     })
//     .catch()//TODO: do error handling

//   }
// }

/**
 * Action that sends updated contacts back to server.
 * This method sends the entire contacts array (5 items)
 * @param  {object} payload the new array of contacts
 * @return {object}         reducer will update state
 */
export const addEmergencyContact = (payload) => {
  var requestBody = payload.existingContacts.concat([{
    contact_name:payload.name,
    contact_phone:payload.phone,
    contact_email:payload.email
  }]);

  return (dispatch) => {
    dispatch(addEmergencyContactSuccess({
      _id: 'New',
      customer_name: payload.name,
      contact_phone: payload.phone,
      contact_email: payload.email
    }));
    fetch(`http://localhost:8000/user/${payload.id}/contacts`,
      {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    })
    .then((response) => {

      dispatch(updateEmergencyContactSuccess(JSON.parse(response._bodyInit).contacts))
    })
    .catch()//TODO: do error handling

  }
}

export const addEmergencyContactSuccess = (payload) => {
  return {
    type: ADD_EMERGENCY_CONTACT,
    payload
  };
}

export const removeEmergencyContact = (payload) => {
  return (dispatch) => {
    fetch('http://localhost:8000/user/' + payload.user_id + '/contacts',
    {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
    .then((response) => {
      console.log("Server resonse: ", response);
      dispatch(updateEmergencyContactSuccess(response));
    })
  }
  // This needs to use the index to remove from state. Send the contact, with userId to server for removal
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
