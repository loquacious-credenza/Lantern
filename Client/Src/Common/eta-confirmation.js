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
      <PopUpAlert elementText={"Please confirm your ETA"}
        extra={<TextInput
          style={componentStyles.input}
          onChangeText={(etaValue) => this.setState({etaValue})}
          value={this.state.etaValue}
          autoFocus={true}
          keyboardType='numeric'>
        </TextInput>}
      buttonText={'Minutes'}
      onPress={this.handleSubmit} />
         
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
