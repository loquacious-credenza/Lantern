'use strict';

import { Dimensions } from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height


module.exports = {
  navigator: {
    flex: 1
  },

  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  loginButton: {
    width: 200,
    height: 50,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 10
  },

  text: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  autocomplete: {
    flex: 1,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,255,255,1)',
    borderRadius: 10,
  },
  autoCompleteContainer: {
    position: 'absolute',
    top: 40,
    width: width,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  descriptionText: {
    position: 'absolute',
    fontSize: 30,
    textAlign: 'center',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
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
  }
};
