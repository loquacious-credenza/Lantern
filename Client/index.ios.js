

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
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
