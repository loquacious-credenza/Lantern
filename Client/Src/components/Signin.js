'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';

// Component
import Login from './Login-button';

export default class SignIn extends Component {
  render() {
    const { actions, state, navigator } = this.props;
    return (
      <View style={styles.container} >
        <Text style={styles.text} >Guardian</Text>
        <Login navigator={navigator} actions={actions} style={styles.loginContainer}/>

      </View>
    );
  }
};

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
