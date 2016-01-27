// 'use strict';

// var React = require('react-native');
// var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
// import Example from './Example';

// AppRegistry.registerComponent('Main', () => Example);

var React = require('react-native');
var {
  AppRegistry
} = React;

var Main = require('./Src/main');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Lantern = React.createClass({
  render: function() {
    return (
        <Main />
    );
  }
});

AppRegistry.registerComponent('Lantern', () => Lantern);
