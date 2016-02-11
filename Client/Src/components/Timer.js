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
import * as base from '../styles-base';



const timerMixin = require('react-timer-mixin');
const moment = require('moment');


module.exports = React.createClass({
  mixins:[timerMixin],
  getTimeRemaining: function() {
    var timeRemaining = moment.duration(this.props.timeRemaining)
    var minutes;
    var seconds;
    if(timeRemaining >= 0){
      minutes = Math.floor(timeRemaining.asMinutes())
      seconds = timeRemaining.seconds()
      if(seconds < 10 && seconds >= 0){
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    } else if (timeRemaining < 0) {
      minutes = -1*Math.ceil(timeRemaining.asMinutes())
      seconds = -1*timeRemaining.seconds()
      if(seconds < 10 && seconds > 0){
        seconds = '0' + seconds;
      }
      return '-' + minutes + ':' + seconds
    }
  },
  determineStyle: function(){
    var timeRemaining = moment.duration(this.props.timeRemaining)
    if(timeRemaining < -1){
      return componentStyle.redText
    } else {
      return componentStyle.blackText
    }
  },
  render: function () {
    const { timeRemaining } = this.props;
    return (
      <View style={styles.timerContainer}>
        <Text style={this.determineStyle()}>
          {this.getTimeRemaining()}
        </Text>
      </View>
    );
  }
});

var componentStyle = StyleSheet.create({
  blackText: {
    textAlign:'center',
    fontSize:20,
    color: base.Primary0,
  },
  redText: {
    textAlign:'center',
    fontSize:20,
    color: base.Accent0,
  }
})
// <Text style={styles.timerValue}>ETA: { moment(endTime).calendar() }</Text>
