'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions;

// Button Styling
export const BUTTON_WIDTH = 200;
export const BUTTON_HEIGHT = 50;
export const SHADOW_RADIUS = 5;
export const BORDER_RADIUS = 10;
export const BUTTON_FONT_SIZE = 20

// System Offsets
export const SYSTEM_STATUS_BAR_WIDTH = 10;

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
    top: SYSTEM_STATUS_BAR_WIDTH,
    left: 0,
    right: 0,
    bottom: 0
  },
  innerContainer: {
    flex: 1
  },
  component: {
    flex: 0,
    position: 'relative',
    width: FULL_WIDTH
  },

  /* As hex codes */
  grayLight: { color: '#E6E6E6' },
  gray0: { color: '#727272' }, /* Main Primary color */
  gray1: { color: '#B9B9B9' },
  gray2: { color: '#8F8F8F' },
  gray3: { color: '#555555' },
  gray4: { color: '#323232' },
  bgGrayLight: { backgroundColor: '#E6E6E6' },
  bgGray0: { backgroundColor: '#727272' },
  bgGray1: { backgroundColor: '#B9B9B9' },
  bgGray2: { backgroundColor: '#8F8F8F' },
  bgGray3: { backgroundColor: '#555555' },
  bgGray4: { backgroundColor: '#323232' },
  bgGrayDark: { backgroundColor: '#171717' },

  colorPrimary0: { color: '#314A62' }, /* Main Primary color */
  colorPrimary1: { color: '#8192A4' }, //Colors go from Light to Dark
  colorPrimary2: { color: '#4E677E' },
  colorPrimary3: { color: '#1A334B' },
  colorPrimary4: { color: '#081B2E' },

  colorComplement0: { color: '#967546' },  /* Main Complement color */
  colorComplement1: { color: '#FCE4C2' },  //Colors go from Light to Dark
  colorComplement2: { color: '#C2A273' },
  colorComplement3: { color: '#745323' },
  colorComplement4: { color: '#462D07' },

  colorAccent0: { color: '#954547' },  /* Main Accent color */
  colorAccent1: { color: '#FAC0C2' },
  colorAccent2: { color: '#C17274' },
  colorAccent3: { color: '#732225' },
  colorAccent4: { color: '#460709' },

  /* As RGBa codes */
  grayRgba0: { color: 'rgba(114,114,114,1)' },  /* Main Primary color */
  grayRgba1: { color: 'rgba(185,185,185,1)' },
  grayRgba2: { color: 'rgba(143,143,143,1)' },
  grayRgba3: { color: 'rgba( 85, 85, 85,1)' },
  grayRgba4: { color: 'rgba( 50, 50, 50,1)' },

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
  rgbaAccent4: { color: 'rgba( 70,  7,  9,1)' }

});
