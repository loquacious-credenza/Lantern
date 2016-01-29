'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} > let me do it as it would be on the home screen</Text>
        <Text>{this.props.route.userName}</Text>
      </View>
    );
  }
};

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
