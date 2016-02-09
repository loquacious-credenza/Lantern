'use strict';
var React = require('react-native');
var {
  AsyncStorage
} = React;
// import { AsyncStorage } from 'react-native';
var moment = require('moment');

import { extend } from 'lodash';

import { getGeolocationForMarkers } from '../helpers/geolocation.js'

import {addStart, addDestination, addEta} from './'

import {
  START_TRIP_SUCCESS,
  START_TRIP_ID,
  START_TRIP_FAIL,
  SET_ON_TRIP,
  CLEAR_ON_TRIP,
  ADD_MARKER
} from '../constants/action-types';

/**
 * Action that happens when the `begin` is clicked.
 * Updates the state with payload
 * @param  {object} payload geolocation data. default is current location from device
 * @return {object}         action processed by reducer `user.onTrip`
 */
// PAYLOAD LOOKS LIKE THIS
/*
{
  id:
  origin:{
    latitude:
    longitude
  },
  destination:{
    latitude:
    longitude
  },
  eta:,
  acceptableDelay:
}
*/

export const startTrip = (payload) => {
  // do send message to server.  Need to do action with thunk.
  let activeTrip = {};
  activeTrip.user_id = payload.id;
  activeTrip.stage = 'tracking';
  activeTrip.origin = payload.markers[0].coordinate;
  activeTrip.destination = payload.markers[1].coordinate;//destination;
  activeTrip.startTime = moment().format();
  activeTrip.eta = moment(activeTrip.startTime).add(parseInt(payload.etaValue), 'minutes').format();
  activeTrip.overdueTime = moment(activeTrip.eta).add(parseInt(payload.acceptableDelay), 'minutes').format(); // CALCULATE DELAY HERE

  return (dispatch) => {
    dispatch(startTripSuccess(activeTrip));
    fetch('http://localhost:8000/user/' + payload.id +'/trip',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(activeTrip)
    }).then( (response) => {
      activeTrip = extend({}, activeTrip, {
        id: JSON.parse(response._bodyInit)._id,
        waypoints: []
      });
      dispatch(setOnTrip({
        onTrip: true,
        activeTrip
      }));
      dispatch(startTripId(activeTrip._id));
    })
  }
}


/**
 * The action returnd when server responds with success.
 * Accepts and forwards on the payload from `startTrip`
 * @param  {object} payload response object from server
 * @return {object}         actions taken after server response
 */


 //PAYLOAD LOOKS LIKE THIS
 //  {
 //    id: null,
 //    startTime: null,
 //    eta: null,
 //    overdueTime: null,
 //    origin: {},
 //    destination: {},
 //    waypoints: []
 //  };
export const startTripId = (payload) => {
  return {
    type: START_TRIP_ID,
    payload: {id:payload}
  }
}

export const startTripSuccess = (payload) => {
  // on successful response from server
  return {
    type: START_TRIP_SUCCESS,
    payload
  };
}

/**
 * Action to use when server responds to startTrip with error.
 * Will change `user.onTrip` to false
 * @param  {object} payload contains error from server and boolean value in `onTrip` property
 * @return {object}         processed by reducer to revert `user.onTrip`
 */
export const startTripError = (payload) => {
  // on error response from server. Do cleanup
  return {
    type: START_TRIP_FAIL,
    payload
  };
}

export const setOnTrip = (payload) => {
  return (dispatch) => {
    AsyncStorage.multiSet([
      ['onTrip', JSON.stringify(payload.onTrip)],
      ['activeTrip', JSON.stringify(payload.activeTrip)]
    ]).then((response) => {
        dispatch({
          type: SET_ON_TRIP,
          payload:{onTrip: true}
        });
      });
  }
};

export const clearOnTrip = (payload) => {
  return (dispatch) => {
    AsyncStorage.multiSet([
      ['onTrip', JSON.stringify(false)],
      ['activeTrip', JSON.stringify(null)]
    ]).then((response) => {
        dispatch({
          type: CLEAR_ON_TRIP
        });
      });
  }
};

export const addMarker = (payload) => {
  return (dispatch) => {
    var markers = [];
    getGeolocationForMarkers(function (location) {
      markers.push({key:0, id:'origin', coordinate:{latitude: location.initialPosition.coords.latitude, longitude: location.initialPosition.coords.longitude}})
      markers.push({key:1, id:'destination', coordinate:{latitude: payload.latitude, longitude: payload.longitude}});
      dispatch({
        type: ADD_MARKER,
        payload: markers
      });
    }
    , function (err) {
      console.log('Error: ', err);
    });
  }
}