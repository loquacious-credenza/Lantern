const {extend} = require('lodash');

const {
    START_TRIP,
    CHECK_IN,
    ADD_WAYPOINT,
    LOAD_TRIP,
    RESET_DELAY,
    ADD_DESTINATION,
    ADD_START
} = require('../constants/action-types');

const initialState = null
// STATE OBJECT LOOKS LIKE THIS
// {
//     id: String,
//     startTime: Date,
//     endTime: Date,
//     origin: {
    
//     },
//     destination: {},
//     waypoints: [],
//     created_at: Date

//   }

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case START_TRIP:
            return extend({}, state, payload);
        case CHECK_IN:
            return null;
        case ADD_WAYPOINT:
            return extend({}, state, state.waypoints.concat(payload));
            // return waypointReducer(state, {type, action});
        case LOAD_TRIP:
            return payload;
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







