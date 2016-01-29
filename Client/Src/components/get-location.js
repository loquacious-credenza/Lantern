'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});


export default class CurrentLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    // const { location, getCurrentLocation } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.props.actions.getCurrentLocation} style={styles.button}>
          <Text>call to get location</Text>
          <Text>{JSON.stringify(this.props.currentLocation)}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
