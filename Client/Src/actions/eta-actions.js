'use strict';

import {
  ADD_ETA
} from '../constants/action-types';


/**
 * The action taken when the ETA field is filled in
 * @param  {object} payload object `endTime` property that is a date item occuring in future
 * @return {object}         processed by reducer and updating `activeTrip.endTime`
 */
export var addEta = (payload) => {
  return {
    type: ADD_ETA,
    payload
  };
}
