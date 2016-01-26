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
  componentDidMount: function(){
    console.log('IN SIGNIN COMPONENT WILL MOUNT');
  },
  render: function() {
    return (
      <View style={styles.container} >
        {console.log('IN SIGIN Render')}
        <Text style={styles.text} >We dont need no stinking image background yet!!</Text>
        <Login style={styles.loginContainer}/>
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('../styles.js'));

module.exports = Signin;
