'use strict';

module.exports = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    map: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    mapCenterMarkerView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    mapCenterMarker: {
        width: 32,
        height: 32,
        backgroundColor: 'transparent'
    },
};
