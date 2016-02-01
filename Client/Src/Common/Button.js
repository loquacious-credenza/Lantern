'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));

var Button = React.createClass ({

  render() {

    return (
        <TouchableHighlight style={styles.button} underlayColor='rgb(255, 255, 255)' onPress={this.props.onPress}>
          <Text style={styles.buttonFont}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
});

module.exports = Button;