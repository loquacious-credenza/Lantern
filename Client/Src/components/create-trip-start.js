'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Dimensions,
  Text,
  Alert,
  Image,
  Navigator,
  TouchableOpacity
} from 'react-native';
import { getCurrentPosition, watchPosition } from '../helpers/geolocation';
import { submitStart, submitEnd } from '../helpers/submitStates';
import { setMarkers } from '../helpers/setMarker';
import MapView from 'react-native-maps';
import AutoComplete from '../Common/AutoComplete';
import Button from '../Common/Button';
import ETA from '../Common/eta-confirmation';
import SafetyButton from '../Common/safety-confirmation';
import SlideUp from './slide-up';

const styles = StyleSheet.create(require('../styles.js'));
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

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
  },
  triangle: {
    width:0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'lightGray'
  }
};

export default class MapStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'setStart',
      description: 'Confirm Start',
      markers: [],
      region: null,
      show: true,
      inRange: false,
      checkedIn: false,
      startPoint: null,
      endPoint: null,
    }
  }
  onRegionChange = (region) => {
    this.setState({ region: region });
  };
  componentWillMount() {
    getCurrentPosition(() => this.setState,() => alert);
    watchPosition(this);
  }
  changeRegion = (location) => {
    this.setState({region: {
      latitude: location.latitude,
      longitude:location.longitude,
      latitudeDelta: .005,
      longitudeDelta: .005 / ASPECT_RATIO}});
  };
  //snaps view to location sets markers on start and end also adjust for marker changes before submit.
  setMarker = (location) => {
    console.log('SETING MARKER',this.state)
    setMarkers(location, this);
  };

  checkingIn = () => {
    this.setState({checkedIn: true, inRange: false});
  };

//handles the submit button being pressed and saves location as start then changes state to next save end
  submit = () => {
    if(this.state.stage === 'setStart'){
      submitStart(this);
    }else if(this.state.stage === 'setEnd'){
      submitEnd(this)
    }
  };

  render() {
    const { state, actions, navigator } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.
    const { activeTrip } = this.props.state
    // var button = this.state.show ? <Button ref='button' style={styles.ButtonContainer} text={this.state.description} onPress={this.submit}></Button> : null;
    var checkIn = this.state.inRange ?
      <Button ref='button' style={styles.ButtonContainer}
        text='CHECK IN YO' onPress={this.checkingIn}>
      </Button> : null;

    var checkedIn = this.state.checkedIn ?
      <SafetyButton elementText={"Thanks for letting us know that you've made it to your destination, " + state.user.name}
        buttonText={"Glad you're safe!"} /> : null;

    var autocomplete = this.state.show ?
      <AutoComplete ref='auto'
        style={styles.autocomplete}
        selectPoint={(input)=>{this.changeRegion(input);
          this.setMarker(input);}}
      /> : null;

    var eta = this.state.stage === 'eta' ?
      <ETA startTrip={(payload)=>{actions.startTrip(payload); this.setState({stage:'tracking',description: 'Currently Tracking your Location'})}}
        tripState={state.activeTrip}
        userId={state.user.id}>
      </ETA> : null

    var callout = this.state.show ?
      <MapView.Callout>
        <TouchableOpacity onPress={()=> {this.submit();}}>
          <Text>Press to Confirm</Text>
        </TouchableOpacity>
      </MapView.Callout> :
      <MapView.Callout>
        <Text>Why u Pressin me</Text>
      </MapView.Callout>;

    return (
      <View style={stylesAlt.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onLongPress={(e) => {this.setMarker(e.nativeEvent.coordinate)}}
          onPress={()=> {if(this.state.show){this.refs.auto.refs.Auto.setState({listViewDisplayed: false}); this.refs.auto.refs.Auto.triggerBlur();}}}
          >

          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              ref={marker.id}
              title={marker.id}
              onDragEnd={(e) => {this.setMarker(e.nativeEvent.coordinate)}}
              draggable>
              {callout}
            </MapView.Marker>
          ))}

        </MapView>
        {checkIn}
        {checkedIn}
        {eta}

        <View style={{position: 'absolute', top: 0, borderTopWidth: 20,borderTopColor:'#B5B5B5', alignItems: 'center', width: width, height: 60, backgroundColor: '#eeeeee'}}>
          <Text style={[styles.descriptionText, {fontWeight: 'bold', bottom: 5, alignSelf: 'center', marginTop: 0, fontSize: 18, backgroundColor: '#eeeeee'}]}>{this.state.description}</Text>
          <TouchableOpacity
            onPress={() => navigator.push({'name': 'settings', sceneConfig: 'FloatFromLeft'})}
            style={[stylesAlt.saveButton, {marginTop: 5, height: 40, width: 50, borderWidth: 0, backgroundColor: 'transparent', flex: 0, alignItems: 'flex-start', position: 'absolute', top: 0, right: 0}]}>
            <Image source={require('../assets/gear-7.png')} />
          </TouchableOpacity>
          <View style={styles.autoCompleteContainer}>
            {autocomplete}
          </View>
        </View>

        <SlideUp
          navigator={navigator}
          nextScene='settings'
          label='Guardian'
          />

      </View>
    );
  }

};
