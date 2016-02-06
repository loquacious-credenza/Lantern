'use strict';

import { Dimensions } from 'react-native';
import * as base from './styles-base';
const { width, height } = Dimensions.get('window');

module.exports = {
  //General compenents
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height/17,
    width: width*.4,
    margin: 5,
    alignSelf: 'center',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: base.Primary1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },

  popUpAlertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    height: height/5,
    width: width*.8,
    justifyContent:'space-around',
  },

  popUpText: {
    textAlign: 'center',
    padding: 5,
  },

  //NavBar
  navBarContainer: {
    flex: 0,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: 40,
    backgroundColor: base.GrayLight,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  navBarText: {
    flex: 0,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: width,
    alignSelf: 'flex-end',
    fontSize: 18,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  navLinkStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    bottom: 0,
    width: 50,
    height: 40,
    paddingBottom: 5,
  },
  //Map View

  autoComplete: {
    backgroundColor: base.GrayLight,
  },

  timerContainer: {
    position: 'relative',
    backgroundColor: base.Primary1,
    width: 80,
    marginTop: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
    paddingHorizontal:5,
    paddingVertical:3,
    shadowRadius: 1,
    height: 40,
    width: width/3,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    alignItems:'center',
    justifyContent:'center'
  },
  timerValue: {
    fontSize: 20,
    color: 'black'
  },
  overTime: {
    position: 'absolute',
    top:40,
    bottom:0,
    right:0,
    left:0,
    backgroundColor:'rgba (255, 0, 0, .3)',
    height:height,
    width:width,

  },

//Settings page

  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
  },
  slider: {
    width: Math.floor(width * .9),
    height: 30,
    position: 'relative',
    alignSelf: 'center',
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
  userContacts: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: base.GrayLight,
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
    width: Math.floor(width * 0.7)
  },
  passwordBG: {
    backgroundColor: '#292B38',
  }
}
