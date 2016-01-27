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
var Home = React.createClass({
  render: function() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} > let me do it as it would be on the home screen</Text>
        <Text>{this.props.route.userName}</Text>
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('../styles.js'));

module.exports = Home;
