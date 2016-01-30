'use strict';

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
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  autoCompleteContainer: {
    position: 'absolute',
    top: 10,
    width: 400,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  descriptionText: {
    position: 'absolute',
    fontSize: 30,
    textAlign: 'center',
    bottom: 0,
    width: 400,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
  }
};
