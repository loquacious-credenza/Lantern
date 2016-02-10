'use strict';
import { SET_STAGE, SET_DESCRIPTION } from '../constants/action-types';

export const setStage = (payload) => {
  return {
    type: SET_STAGE,
    payload: payload
  }
}

export const setDescription = (payload) => {
  return {
    type: SET_DESCRIPTION,
    payload: payload
  }
}