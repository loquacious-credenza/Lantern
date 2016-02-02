'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));

var SafetyButton = React.createClass({

  render: function() {
    return (
      <View style={componentStyles.background}>
        <View style={componentStyles.alertContainer}>
        <Text style={componentStyles.text}>{"Thank you for letting us know that you've reached your destination, " + this.props.name +"."}</Text>
        <TouchableOpacity style={componentStyles.button}><Text style={componentStyles.buttonText}>{"Glad you're safe!"}</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

});

module.exports = SafetyButton;

import { Dimensions } from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height

var componentStyles = StyleSheet.create({
  background: {
    backgroundColor:'transparent',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    height: height/5,
    width: width*.8,
    justifyContent:'space-around',
  },
  button: {
    backgroundColor:'#78ABDD',
    borderRadius: 5,
    padding: 5,
    alignSelf:'center',
    width: width*.4,
    height: height/17,
    justifyContent:'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  }
});