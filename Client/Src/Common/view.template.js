'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var ViewTemplate = React.createClass({
  render: function() {
    return (
      <View style={styles.container} >
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('../styles.js'));

module.exports = ViewTemplate;