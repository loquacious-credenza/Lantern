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
    height: base.BUTTON_HEIGHT,
    width: base.FULL_WIDTH_PADDED,
    margin: 5,
    alignSelf: 'center',
    padding: 5,
    borderColor: 'gray',
    borderWidth: base.BUTTON_BORDER_WIDTH,
    borderRadius: base.BUTTON_BORDER_RADIUS,
    backgroundColor: base.Primary0,
  },
  button2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: base.BUTTON_HEIGHT * 1.5,
    width: width*.4,
    margin: 5,
    alignSelf: 'center',
    padding: 2,
    borderColor: 'gray',
    borderWidth: base.BUTTON_BORDER_WIDTH,
    borderRadius: base.BUTTON_BORDER_RADIUS,
    backgroundColor: base.Primary1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: base.BUTTON_FONT_SIZE,
    fontFamily: base.FONT,
    fontWeight: base.FONT_LIGHT
    color: base.LIGHT
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
    fontFamily:base.FONT,
    fontWeight:base.FONT_HEAVY
  },

  //NavBar
  navBarContainer: {
    flex: 0,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: 40,
    backgroundColor: base.Primary0,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  navBarText: {
    flex: 0,
    justifyContent: 'center',
    // fontWeight: 'bold',
    textAlign: 'center',
    width: width,
    alignSelf: 'flex-end',
    fontSize: 18,
    fontFamily: base.FONT,
    fontWeight: base.FONT_HEAVY,
    backgroundColor: 'transparent',
    paddingBottom: 10,
    color: 'white'
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
    backgroundColor: 'white',
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
    fontFamily: base.FONT,
    fontWeight: base.FONT_LIGHT
    width: width,
    paddingLeft: width * 0.05,
    paddingBottom: 5
  },
  sliderContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: 'transparent',
    height: base.TENTH_HEIGHT * 1.5,
    marginBottom: 20
  },
  slider: {
    width: Math.floor(width * .9),
    height: 30,
    position: 'relative',
    alignSelf: 'center',
    padding: 5,
  },
  emergencyContactForm: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  emergencyInput: {
    padding: 4,
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: base.BORDER_RADIUS,
    backgroundColor: 'white',
    margin: 2,
    width: Math.floor(width * 0.9),
    alignSelf: 'center'
  },
  userContacts: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: base.BORDER_RADIUS,
    backgroundColor: base.bgWhite,
    borderLeftWidth: 5,
    borderLeftColor: base.Primary0,
    marginTop: 10,
    width: Math.floor(width * 0.9),
    alignSelf: 'center',
    paddingTop: 5
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
  }
}
