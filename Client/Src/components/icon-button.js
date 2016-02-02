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

const icons = {
  // rightArrow: '../assets/half-arrow-right-7.png'
  rightArrow: require('../assets/half-arrow-right-7.png'),
  gear: require('../assets/gear-7.png')
}

export default class CurrentLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, actions, navigator, route } = this.props;
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={[styles.saveButton, {marginTop: 25, height: 40, width: 50, borderWidth: 0, backgroundColor: 'transparent', flex: 0, alignItems: 'flex-start', position: 'absolute', top: 0, right: 0}]}>
        <Image source={image} />
      </TouchableOpacity>
    );
  }
}
