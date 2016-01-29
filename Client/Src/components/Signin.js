'use strict';


import { Component } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

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
        <Login navigator={this.props.navigator} style={styles.loginContainer} login={this.props.login}/>
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('../styles.js'));

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Signin);
