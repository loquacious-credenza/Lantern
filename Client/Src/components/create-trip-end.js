'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';


const MapView = require('react-native-maps');
const AutoComplete = require('../Common/AutoComplete');
const styles = StyleSheet.create(require('../styles.js'));


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class MapStart extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('PROPS',this.props.state)
    this.setState({center: {
        latitude: this.props.state.activeTrip.origin.latitude,
        longitude: this.props.state.activeTrip.origin.longitude,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0050 * ASPECT_RATIO,
      }
    });
  }

  focusIn = (location) => {
    this.props.actions.addDestination(location);
    this.props.navigator.replace({name: 'map'})
  };

  render() {
    console.log('THIS STATE', this.state)
    const { state, actions } = this.props;
    // const { activeTrip } = state; //destructure the parts of state that you need
    // const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.center}
          showsUserLocation={false}
        >
        </MapView>
        <View style={styles.autoCompleteContainer}>
            <AutoComplete style={styles.autocomplete} selectPoint={this.focusIn} />
        </View>
        <Text style={styles.descriptionText}>Select your destination {state.user.name}</Text>
      </View>
    );
  }
};


