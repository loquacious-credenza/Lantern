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
const moment = require('moment');


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 0
    }
  }

  componentDidMount() {
    this.setState({
      timeRemaining: (this.props.endTime - Date.now())
    });
    timerMixin.setInterval.call(this, function(){
      this.setState({timeRemaining: this.state.timeRemaining -= 1000});
    },1000)
  }

  render() {
    const { endTime } = this.props;
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timerValue}>ETA: { moment(endTime).calendar() }</Text>
        <Text style={styles.timerValue}>Time remaining: { moment.duration(this.state.timeRemaining).humanize() }</Text>
      </View>
    );
  }
};
