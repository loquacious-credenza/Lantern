// 'use strict';

// var React = require('react-native');
// var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
// import Example from './Example';

// AppRegistry.registerComponent('Main', () => Example);

var React = require('react-native');
const rr = require('react-redux');
console.log('react-redux', rr);
const Provider = rr.Provider
console.log('WE GOT PROVIDER', Provider);
var {
  AppRegistry
} = React;

var Main = require('./Src/containers/main');
var configureStore = require('./Src/Store/configure-store.js');

/*========= REMOVE LATER: FOR DEBUGGING=======================*/
// var store = configureStore();
// store.subscribe(() => {
//   console.dir(store.getState());
// });

// console.log('State is ', store.getState());

/*=============================================================*/

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Lantern = React.createClass({
  render: function() {
    return (
        <Provider store={store}>
          <Main />
        </Provider>
    );
  }
});

AppRegistry.registerComponent('Lantern', () => Lantern);
