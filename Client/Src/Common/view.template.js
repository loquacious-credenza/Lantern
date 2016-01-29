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

export default class CurrentLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={styles.container}>
      </View>
    );
  }
}

