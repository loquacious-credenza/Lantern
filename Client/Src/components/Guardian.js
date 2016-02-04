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
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: '#833',
    alignSelf: 'center',
    top: 200,
    borderWidth: 1,
    borderColor: '#222'
  },
  square: {
    width: 75,
    height: 75,
    borderRadius: 3,
    backgroundColor: '#000',
    alignSelf: 'center',
    top: 62.5
  }
});

export default class Guardian extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions, navigator } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={localStyles.guardianContainer}>
        <NavBar
          navigator={navigator}
          description='Guardian'
        />
        <TouchableOpacity onPress={() => {
          navigator.pop()
        }}>
          <View style={localStyles.circle}>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
