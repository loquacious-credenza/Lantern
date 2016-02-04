'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import NavBar from './nav-bar';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));
const localStyles = StyleSheet.create({
  guardianContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightGray'
  },
  circle: {
    width: 175,
    height: 175,
    borderRadius: 175/2,
    backgroundColor: 'red'
  }
});

export default class Guardian extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={localStyles.guardianContainer}>
        <NavBar
          navigator={navigator}
          description='Guardian'
        />
        <TouchableOpacity>
          <View style={localStyles.circle} />
        </TouchableOpacity>
      </View>
    );
  }
}
