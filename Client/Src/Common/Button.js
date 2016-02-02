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
        <TouchableHighlight style={componentStyles.button} underlayColor='rgb(255, 255, 255)' onPress={this.props.onPress}>
          <Text style={styles.buttonFont}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
});

module.exports = Button;

var componentStyles = StyleSheet.create({
    button: {
    backgroundColor:'#78ABDD',
    borderRadius: 5,
    padding: 5,
    alignSelf:'center',
    alignItems:'center',
    width: width*.4,
    height: height/13,
    justifyContent:'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14
  }
})