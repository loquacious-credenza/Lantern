'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Dimensions,
  Text,
  Image,
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

const stylesAlt = {
  saveButton: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 125,
    marginTop: 25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'teal'
  },
  container: {
    flex: 1,
    backgroundColor: 'lightBlue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButtonText: {
    fontSize: 20,
    color: 'white'
  }
};


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
      <View style={stylesAlt.container}>


        <MapView
          style={styles.map}
          showsUserLocation={true}
        >
        </MapView>
        <View style={[styles.autoCompleteContainer, {top: 60, height: 30}]}>
            <AutoComplete style={styles.autocomplete} selectPoint={this.focusIn} />
        </View>
        <View style={{position: 'absolute', top: 0, alignItems: 'center', width: width, height: 60, backgroundColor: 'gray'}}>
          <Text style={[styles.descriptionText, {fontWeight: 'bold', bottom: 10, alignSelf: 'center', marginTop: 0, fontSize: 16, backgroundColor: 'gray'}]}>{this.state.description}</Text>
          <TouchableOpacity
            onPress={() => navigator.push({'name': 'settings'})}
            style={[stylesAlt.saveButton, {marginTop: 20, height: 40, width: 50, borderWidth: 0, backgroundColor: 'transparent', flex: 0, alignItems: 'flex-start', position: 'absolute', top: 0, right: 0}]}>
            <Image source={require('../assets/gear-7.png')} />
          </TouchableOpacity>

        </View>
      </View>
    );
  }
};

