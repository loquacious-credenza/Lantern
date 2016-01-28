'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Login = require('./Login-button');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Signin = React.createClass({
  render: function() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} >We dont need no stinking image background yet!!</Text>
        <Login navigator={this.props.navigator} style={styles.loginContainer}/>
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('../styles.js'));

module.exports = Signin;
