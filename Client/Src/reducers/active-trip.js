'use strict';
const {extend} = require('lodash');

const {
  START_TRIP_SUCCESS,
  START_TRIP_ID,
  CHECK_IN_SUCCESS,
  ADD_WAYPOINT,
  CONFIRM_IN_RANGE,
  LOAD_TRIP,
  LOAD_ACTIVE_TRIP,
  RESET_DELAY,
  ADD_DESTINATION,
  CLEAR_ON_TRIP,
  ADD_MARKER,
  ADD_START
} = require('../constants/action-types');

const initialState = {
  id: null,
  stage: 'setStart',
  startTime: null,
  markers: [],
  eta: null,
  overdueTime: null,
  inRange: false,
  origin: {},
  destination: {},
  waypoints: []
};

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case START_TRIP_SUCCESS:
      return extend({}, state, payload);
    case START_TRIP_ID:
      return extend({}, state, payload);
    case CHECK_IN_SUCCESS:
      return extend({}, state, {
        onTrip: false,
        activeTrip: null
      });
    case ADD_WAYPOINT:
      return extend({}, state, {waypoints:state.waypoints.concat([payload])});
      // return waypointReducer(state, {type, action});
    case CONFIRM_IN_RANGE:
      return extend({}, state, {
        inRange: true
      });
    case LOAD_ACTIVE_TRIP:
      return extend({}, state, {
        id: payload.id,
        startTime: payload.startTime,
        eta: payload.eta,
        stage: payload.stage,
        markers: state.markers.concat(payload.markers),
        overdueTime: payload.overdueTime,
        origin: extend({}, state.origin, payload.origin),
        destination: extend({}, state.destination, payload.destination),
        waypoints: state.waypoints.concat(payload.waypoints)
      });
    case CLEAR_ON_TRIP:
      return initialState;
    case ADD_MARKER:
      return extend({}, state, {
        markers: state.markers.concat([payload])
      });
    case RESET_DELAY:
      return extend({}, state, {endTime:new Date});
      // TO DO: DOUBLE CHECK THIS LOGIC
    case ADD_START:
      return extend({}, state, {origin:payload});
    case ADD_DESTINATION:
      return extend({}, state, {destination:payload})
    default:
      return state;
  }
}
