'use strict';

import { Dimensions } from 'react-native';
import * as base from './styles-base';
const { width, height } = Dimensions.get('window');

module.exports = {

  autoComplete: {
    backgroundColor: base.GrayLight,
  },
  slider: {
    width: Math.floor(width * .9),
    height: 30,
    position: 'relative',
    alignSelf: 'center',
    padding: 5,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
  },
  emergencyInput: {
    padding: 4,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 2,
    width: Math.floor(width * 0.9),
    alignSelf: 'center'
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: width*.4,
    margin: 5,
    alignSelf: 'center',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: base.Primary1,
  },

  contactListItem: {
    marginTop: 5,
    padding: 5,
    alignSelf: 'center',
    width: width * 0.95,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: base.GrayLight,
  },
  buttonText: {
    textAlign: 'center',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: 200,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  buttonFont: {
    fontSize: 20,
  },
  timerContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal:5,
    paddingVertical:3,
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 10
  },
  timerValue: {
    fontSize: 20,
    color: 'black'
  },
  userContacts: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginTop: 10,
    width: Math.floor(width * 0.9),
    alignSelf: 'center'
  },
  userContactDeleteButton: {
    marginTop: 10,
    position: 'absolute',
    width: 20,
    right: 20,
    justifyContent: 'flex-end'
  },
  userContactsText: {
    justifyContent: 'flex-start',
    width: Math.floor(width * 0.8)
  }
  // descriptionText: {
  //   position: 'absolute',
  //   fontSize: 30,
  //   textAlign: 'center',
  //   bottom: 0,
  //   width: width,
  //   flexDirection: 'row',
  //   backgroundColor: 'rgba(255,255,255,0.7)',
  // },
  // ButtonContainer: {
  //   position: 'absolute',
  //   bottom: 10,
  //   width: 200,
  //   flexDirection: 'row',
  //   backgroundColor: 'rgba(255,255,255,0.7)',
  // },
  // buttonFont: {
  //   fontSize: 20,
  // },
  // timerContainer: {
  //   backgroundColor: 'rgba(255,255,255,0.7)',
  //   paddingHorizontal:5,
  //   paddingVertical:3,
  //   shadowRadius: 2,
  //   shadowColor: '#000000',
  //   shadowOpacity: 1,
  //   shadowOffset: {width: 0, height: 0},
  //   borderRadius: 10
  // },
  // timerValue: {
  //   fontSize: 20,
  //   color: 'black'
  // }
};
