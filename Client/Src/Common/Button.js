'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { Dimensions } from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height
// importing styles
const styles = StyleSheet.create(require('../styles.js'));

var Button = React.createClass ({

  render() {

    return (
        <TouchableHighlight style={styles.button} underlayColor='rgb(255, 255, 255)' onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
});

module.exports = Button;
