'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Button Styling
export const BUTTON_WIDTH = 200;
export const BUTTON_HEIGHT = 50;
export const SHADOW_RADIUS = 5;
export const BORDER_RADIUS = 10;
export const BUTTON_FONT_SIZE = 20

// System Offsets
export const SYSTEM_STATUS_BAR_WIDTH = 20;

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
export const GrayLight = 'rgba(230,230,230,1)'; /* Main Primary color */
export const Gray0 = 'rgba(114,114,114,1)';
export const Gray1 = 'rgba(185,185,185,1)';
export const Gray2 = 'rgba(143,143,143,1)';
export const Gray3 = 'rgba( 85, 85, 85,1)';
export const Gray4 = 'rgba( 50, 50, 50,1)';
export const GrayDark = 'rgba(23,23,23,1)';

export const Primary0 = 'rgba( 49, 74, 98,1)'; /* Main Primary color */
export const Primary1 = 'rgba(129,146,164,1)';
export const Primary2 = 'rgba( 78,103,126,1)';
export const Primary3 = 'rgba( 26, 51, 75,1)';
export const Primary4 = 'rgba( 8, 27, 46,1)';

export const Complement0 = 'rgba(150,117, 70,1)'; /* Main Complement color */
export const Complement1 = 'rgba(252,228,194,1)';
export const Complement2 = 'rgba(194,162,115,1)';
export const Complement3 = 'rgba(116, 83, 35,1)';
export const Complement4 = 'rgba( 70, 45, 7,1)';

export const Accent0 = 'rgba(149, 69, 71,1)'; /* Main Accent color */
export const Accent1 = 'rgba(250,192,194,1)';
export const Accent2 = 'rgba(193,114,116,1)';
export const Accent3 = 'rgba(115, 34, 37,1)';
export const Accent4 = 'rgba( 70, 7, 9,1)';

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
    backgroundColor: GrayLight,
  },
  component: {
    flex: 0,
    position: 'relative',
    width: FULL_WIDTH
  },


  /* As RGBa codes */
  grayRgba0: { color: 'rgba(114,114,114,1)' },  /* Main Primary color */
  grayRgba1: { color: 'rgba(185,185,185,1)' },
  grayRgba2: { color: 'rgba(143,143,143,1)' },
  grayRgba3: { color: 'rgba( 85, 85, 85,1)' },
  grayRgba4: { color: 'rgba( 50, 50, 50,1)' },

  bgGrayLight: { backgroundColor: 'rgba(230,230,230,1)' },
  bgGray0: { backgroundColor: 'rgba(114,114,114,1)' },
  bgGray1: { backgroundColor: 'rgba(185,185,185,1)' },
  bgGray2: { backgroundColor: 'rgba(143,143,143,1)' },
  bgGray3: { backgroundColor: 'rgba( 85, 85, 85,1)' },
  bgGray4: { backgroundColor: 'rgba( 50, 50, 50,1)' },
  bgGrayDark: { backgroundColor: 'rgba(23,23,23,1)' },

  rgbaPrimary0: { color: 'rgba( 49, 74, 98,1)' },  /* Main Primary color */
  rgbaPrimary1: { color: 'rgba(129,146,164,1)' },
  rgbaPrimary2: { color: 'rgba( 78,103,126,1)' },
  rgbaPrimary3: { color: 'rgba( 26, 51, 75,1)' },
  rgbaPrimary4: { color: 'rgba(  8, 27, 46,1)' },

  rgbaComplement0: { color: 'rgba(150,117, 70,1)' }, /* Main Complement color */
  rgbaComplement1: { color: 'rgba(252,228,194,1)' },
  rgbaComplement2: { color: 'rgba(194,162,115,1)' },
  rgbaComplement3: { color: 'rgba(116, 83, 35,1)' },
  rgbaComplement4: { color: 'rgba( 70, 45,  7,1)' },

  rgbaAccent0: { color: 'rgba(149, 69, 71,1)' }, /* Main Accent color */
  rgbaAccent1: { color: 'rgba(250,192,194,1)' },
  rgbaAccent2: { color: 'rgba(193,114,116,1)' },
  rgbaAccent3: { color: 'rgba(115, 34, 37,1)' },
  rgbaAccent4: { color: 'rgba( 70,  7,  9,1)' },

  bgTransparent: { backgroundColor: 'transparent' },


});
