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
import NavBar from './nav-bar';
import Timer from '../Common/timer-overlay';
import handleEta from '../Common/handle-eta';

const styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

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
    getCurrentPosition(() => this.setState, () => alert);
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

      <View style={[baseStyles.container, baseStyles.absoluteCenter]}><Button ref='button' style={[styles.button, baseStyles.absoluteCenter]}
        text='Arrived Safely' onPress={this.checkingIn}>
      </Button></View> : null;

    var checkedIn = this.state.checkedIn ?
      <SafetyButton elementText={"Thanks for letting us know that you've made it to your destination, " + state.user.name}
        buttonText={"Glad you're safe!"} /> : null;

    var autocomplete = this.state.show ?
      <View style={[baseStyles.component, styles.autoComplete]}>
        <AutoComplete ref='auto'
          selectPoint={(input)=>{this.changeRegion(input);
            this.setMarker(input);}}
        />
      </View> : null;

    var eta = this.state.stage === 'eta' ?
      <ETA startTrip={(payload)=> {
          actions.startTrip(payload);
          this.setState({
            stage:'tracking',
            description: 'Currently Tracking your Location'
          });
        }}
        tripState={state.activeTrip}
        userId={state.user.id}
        acceptableDelay={state.user.acceptableDelay}
        >
      </ETA> : null;

    var callout = this.state.show ?
      <MapView.Callout>
        <TouchableOpacity onPress={()=> {this.submit();}}>
          <Text>Press to Confirm</Text>
        </TouchableOpacity>
      </MapView.Callout> :
      <MapView.Callout>
        <Text></Text>
      </MapView.Callout>;

    var timer = this.state.stage === 'tracking' ?
    <Timer
      state = {activeTrip}>
    </Timer> : null;

    return (
      <View style={[baseStyles.container]}>
        <MapView
          style={baseStyles.container}
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

        <NavBar
          navigator={navigator}
          description={this.state.description}
          right={{image: 'gear', action: () => navigator.push({name: 'settings'})}}
          />

        {autocomplete}

        {checkIn}
        {checkedIn}
        {eta}
        {timer}


        <SlideUp
          navigator={navigator}
          nextScene='guardian'
          label='Guardian'
          />

      </View>
    );
  }

};
