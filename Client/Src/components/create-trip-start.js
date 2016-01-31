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
    this.setState({
      submit: 'start',
      description: 'Select starting location',
    });
  }
  focusIn = (location) => {
    if(this.state.submit === 'start'){
      this.props.actions.addStart(location);
      this.setState({submit: 'end', description: 'Select destination'});
    }else if(this.state.submit === 'end'){
      this.props.actions.addDestination(location);
      this.props.navigator.replace({name: 'map'});
    }
  };

  render() {
    const { state, actions, navigator } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
        >
        </MapView>
        <View style={styles.autoCompleteContainer}>
            <AutoComplete style={styles.autocomplete} selectPoint={this.focusIn} />
        </View>
        <Text style={styles.descriptionText}>{this.state.description}{"\n"}{state.user.name}</Text>
      </View>
    );
  }
};

