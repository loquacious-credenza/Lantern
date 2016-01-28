'use strict';

const { extend } = require('lodash');

const {
  PASSED_ACCEPTABLE_DELAY,
  PASSED_ETA,
  RESET_DELAY,
  RESET_DELAY_SUCCESS,
  RESET_DELAY_FAIL
} = require('../constants/action-types');

export var isOverdue = (state = false, { type, payload }) => {
  switch (type) {
    case PASSED_ACCEPTABLE_DELAY:
      return extend({}, state, {
        isOverdue: true
        // maybe we need a notifyContacts flag?
        // isOverdue: payload.isOverdue
      });
    case PASSED_ETA:
      return extend({}, state, {
        isOverdue: true
        // isOverdue: payload.isOverdue
      });
    case RESET_DELAY:
      return extend({}, state, {
        isOverdue: true
        // should this be setting authenticate flag instead?
        // isOverdue: false
      });
    case RESET_DELAY_SUCCESS:
      return extend({}, state, {
        isOverdue: false
      });
    case RESET_DELAY_FAIL:
      return extend({}, state, {
        isOverdue: true
      });
    default:
      return state;
  }
};
