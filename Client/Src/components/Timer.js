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

export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      timeRemaining: (this.props.endTime - Date.now())
    });

    timerMixin.setInterval.call(this, function(){
      this.setState({timeRemaining: this.state.timeRemaining -= 1000});
    },1000)
  }

  render() {
    const { endTime } = this.props;
    //const { currentLocation } = state; //destructure the parts of state that you need
    //const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.
    const timeRemaining = endTime - Date.now();

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timerValue}>Expected time of arrival: { endTime }</Text>
        <Text style={styles.timerValue}>Time remaining: { this.state.timeRemaining }</Text>
      </View>
    );
  }
};
