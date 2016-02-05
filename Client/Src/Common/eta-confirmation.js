'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));
import Button from './Button';
import PopUpAlert from './popUp-confirmation';


var ETA = React.createClass({
  getInitialState: function(){
    return {
      etaValue: ""
    };
  },
  handleSubmit: function(){
    const {startTrip, acceptableDelay, markers} = this.props;
    const state = this.props.tripState;
    var payload = {};
    payload.id = this.props.userId;
    payload.origin = state.origin;
    payload.destination = state.destination;
    payload.etaValue = this.state.etaValue;
    payload.acceptableDelay = acceptableDelay;
    payload.markers = state.markers;
    startTrip(payload);
  },


  render: function() {

    return (
      <View style={componentStyles.background}>
        <View style={componentStyles.alertContainer}>
        <Text style={componentStyles.text}>{"Please confirm your ETA"}</Text>
        <TextInput
          style={componentStyles.input}
          onChangeText={(etaValue) => this.setState({etaValue})}
          value={this.state.etaValue}
          keyboardType='numeric'>
        </TextInput>
        <TouchableOpacity
          style={componentStyles.button}
          onPress={()=>{
            this.handleSubmit();
          }
        }>
         <Text style={componentStyles.buttonText}>
          {"Minutes"}
         </Text>
         </TouchableOpacity>
        </View>
      </View>
    );
  }
});

module.exports = ETA;

import { Dimensions } from 'react-native';
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height

var componentStyles = StyleSheet.create({
  input: {
    alignSelf:'center',
    textAlign:'center',
    borderWidth:1,
    height: height/16,
    width: width*.5
  }
});
