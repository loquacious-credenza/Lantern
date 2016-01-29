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
    const { state, actions, configureScene, route } = this.props;
    console.log("CJKJKLJER:EJR:EHRKJEHRKJEHLRJ",configureScene.toString());
    const { currentLocation } = state;
    const { getCurrentLocation } = actions;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={getCurrentLocation} style={styles.button}>
          <Text>call to get location</Text>
          <Text>{JSON.stringify(currentLocation)}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
