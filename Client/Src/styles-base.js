'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Button Styling
export const BUTTON_WIDTH = 200;
export const BUTTON_HEIGHT = 40;
export const SHADOW_RADIUS = 5;
export const BORDER_RADIUS = 0;
export const BUTTON_BORDER_RADIUS = 0;
export const BUTTON_BORDER_WIDTH = 0;
export const BUTTON_FONT_SIZE = 20;
export const BUTTON_FONT_SIZE_SMALL = 14;

// System Offsets
export const SYSTEM_STATUS_BAR_WIDTH = 20;

export const FONT_LIGHT = '200';
export const FONT_HEAVY = '300';
export const FONT = 'Helvetica Neue';


export const FULL_WIDTH = width;//Width based constants
export const FULL_WIDTH_PADDED = Math.floor(width * 0.9);
export const THREE_QUARTER_WIDTH = Math.floor(width * 0.75);
export const HALF_WIDTH = Math.floor(width * 0.5);
export const TWO_THIRD_WIDTH = Math.floor(width * 0.66667);
export const ONE_THIRD_WIDTH = Math.floor(width * 0.33333);
export const QUARTER_WIDTH = Math.floor(width * 0.25);
export const FIFTH_WIDTH = Math.floor(width * 0.20);
export const TENTH_WIDTH = Math.floor(width * 0.10);
export const ZERO_WIDTH = 0;

export const FULL_HEIGHT = height;//Height based constants
export const FULL_HEIGHT_PADDED = Math.floor(height * 0.9);
export const THREE_QUARTER_HEIGHT = Math.floor(height * 0.75);
export const HALF_HEIGHT = Math.floor(height * 0.5);
export const TWO_THIRD_HEIGHT = Math.floor(height * 0.66667);
export const ONE_THIRD_HEIGHT = Math.floor(height * 0.33333);
export const QUARTER_HEIGHT = Math.floor(height * 0.25);
export const FIFTH_HEIGHT = Math.floor(height * 0.20);
export const TENTH_HEIGHT = Math.floor(height * 0.10);
export const ZERO_HEIGHT = 0;

  /* As RGBa codes */
export const LIGHT = 'rgba(255,255,250,1)'; /* Main Primary color */
export const GrayLight = 'rgba(230,230,230,1)'; /* Main Primary color */
export const Primary0 =  '#4489CB'; /* Main Primary color */
export const Accent0 = 'rgba(149, 69, 71,1)'; /* Main Accent color */
export const overTime = 'rgba (255, 0, 0, .3)'; /* Main Accent color */



export const baseStyles = StyleSheet.create({
  /*FOR DEVELOPMENT*/
  development: {
    flex: 0,
    width: FULL_WIDTH,
    height: QUARTER_HEIGHT
  },
  /*Layout*/
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navContainer: {
    position: 'absolute',
    top: SYSTEM_STATUS_BAR_WIDTH,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centeredContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteCenter: {
    flex:1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: FULL_HEIGHT,
    width: FULL_WIDTH,
    // alignSelf: 'center'
  },
  colCenterContainer: {
    position: 'relative',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  FullScreen: {
    flex: 1,
    backgroundColor: Primary0,
  },
  component: {
    flex: 0,
    position: 'relative',
    width: FULL_WIDTH
  },


  /* As RGBa codes */



  colorPrimary0: { color: Primary0 },  /* Main Primary color */
  colorLight: { color: LIGHT },  /* Main Primary color */
  colorAccent0: { color: Accent0 }, /* Main Accent color */

  bgLight: { backgroundColor: LIGHT },
  bgAccent0: { backgroundColor: Accent0 }, /* Main Accent color */
  bgPrimary0: { backgroundColor: Primary0 }, /* Main Accent color */
  bgTransparent: { backgroundColor: 'transparent' },


});
