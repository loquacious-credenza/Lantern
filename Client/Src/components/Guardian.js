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
      <View style={[styles.container, {backgroundColor: 'lightGray'}, {top:20}]}>
        <NavBar
          style={{marginTop: 20}}
          navigator={navigator}
          description='Guardian'
        />
      </View>
    );
  }
}
