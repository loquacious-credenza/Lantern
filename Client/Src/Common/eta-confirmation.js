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

var ETA = React.createClass({
  getInitialState: function(){
    return {
      etaValue: ""
    };
  },
  handleSubmit: function(){
    const {startTrip, acceptableDelay} = this.props;
    const state = this.props.tripState;
    var payload = {};
    payload.id = this.props.userId;
    payload.origin = state.origin;
    payload.destination = state.destination;
    payload.etaValue = this.state.etaValue;
    payload.acceptableDelay = acceptableDelay;
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
    backgroundColor: 'rgba (255,255,255,0.8)',
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
  },
  input: {
    alignSelf:'center',
    textAlign:'center',
    borderWidth:1,
    height: height/16,
    width: width*.5
  }
});