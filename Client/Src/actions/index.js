'use strict';

// modifies `isLoggedIn`
export {
  login,
  logout
} from './logging-actions'

/*=============================================================*/

// modifies `origin`
export {
  addStart
} from './start-location-actions'

/*=============================================================*/

//modifies `destination`
export {
  addDestination,
  addDestinationSuccess,
  addDestinationFail
} from './destination-location-actions';

/*=============================================================*/

// modifies `endTime`
export {
  addEta
} from './eta-actions'

/*=============================================================*/

//modifies `waypoints`
export {
  addWaypoint
} from './waypoint-actions'

/*=============================================================*/

//modifies `onTrip` and `startTime`
export {
  startTrip,
  startTripSuccess,
  startTripError
} from './start-trip-actions'

/*=============================================================*/

// modifies `onTrip`
export {
  checkIn,
  checkInSuccess,
  checkInFail
} from './check-in-actions'

/*=============================================================*/

//modifies `isOverdue`
export {
  setPassedTimeDelay,
  passedAcceptableDelay,
  passedEta
} from './passed-time-actions';

/*=============================================================*/

//modifies `isOverdue` and `endTime`
export {
  resetDelay,
  resetDelaySuccess,
  resetDelayFail
} from './reset-delay-actions'

/*=============================================================*/

// modifies `emergencyContacts`
export {
  addEmergencyContact,
  updateEmergencyContact,
  updateEmergencyContactSuccess,
  updateEmergencyContactFail
} from './emergency-contact-actions';

/*=============================================================*/

//modifies `currentLocation`
export {
  getCurrentLocation,
  getCurrentLocationSuccess,
  getCurrentLocationFail
} from './current-location-actions'

/*=============================================================*/

//modifies `authenticated` NEEDS TO BE CREATED
export {
  authenticate,
  authSuccess,
  authError
} from './authenticate-actions';

/*=============================================================*/

export {
  loadDelay,
  loadEmergencyContact
} from './loading-actions';
