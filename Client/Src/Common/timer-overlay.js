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
const timerMixin = require('react-timer-mixin');
const Timer = require('../components/Timer')
var moment = require('moment');
var endTime;

var TimerOverlay = React.createClass({
  mixins:[timerMixin],
  getInitialState: function(){
   return {
      timeRemaining: 1000,
      timeToEmail: 1000
    }
  },
  componentDidMount: function() {
    var {eta, startTime, overdueTime} = this.props.state;
    // WHAT WE HAVE: ETA + ACCEPTABLE DELAY
    var now = moment()
    var timeRemaining = (moment(eta)-now) - (moment(eta)-now)%1000;
    this.setState({timeRemaining: timeRemaining});
    this.setInterval(function(){
      this.setState({timeRemaining: this.state.timeRemaining -= 1000});
    },1000);
  },
  renderOverlay:function(){
    if(this.state.timeRemaining < 0){
      return styles.overTime;
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <View style={this.renderOverlay()}>
        <Timer timeRemaining={this.state.timeRemaining} />
      </View>
    );
  }

});

module.exports = TimerOverlay;

