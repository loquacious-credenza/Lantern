'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Dimensions,
  Text,
  Image,
  Navigator,
  TouchableOpacity
} from 'react-native';


const MapView = require('react-native-maps');
const AutoComplete = require('../Common/AutoComplete');
const Button = require('../Common/Button');
const ETA = require('../Common/eta-confirmation');
const SafetyButton = require('../Common/safety-confirmation');
var calculateMidpoint = require('../helpers/calculate-midpoint');
var calculateDistance = require('../helpers/calculate-distance');
const styles = StyleSheet.create(require('../styles.js'));
import SlideUp from './slide-up';

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
  }
  onRegionChange = (region) => {
    this.setState({ region: region });
  };
  componentWillMount() {
        // Get position once
    navigator.geolocation.getCurrentPosition(
        (initialPosition) => this.setState({initialPosition}), // success callback
        (error) => alert(error.message), // failure callback
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
    );

    // Repeatedly track position
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
      let coords = lastPosition.coords;
      this.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      if(this.state.submit === 'tracking'){
        let distance = calculateDistance(this.state.end.latitude, this.state.end.longitude, lastPosition.coords.latitude, lastPosition.coords.longitude);
        if(distance <= 0.2){
          this.setState({inRange: true});
        }
      }
      // console.log('waypoints',this.props.state.activeTrip.waypoints);
    });
    this.setState({
      submit: 'start',
      description: 'Confirm Start',
      markers: [],
      region: null,
      show: true,
      inRange: false,
      checkedIn: false,
    });
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
    if(this.state.submit === 'start'){
      this.setState({start: location});
      if(this.state.markers.length === 0){
        this.setState({markers: this.state.markers.concat([{key: 0, id:'origin',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }else{
        this.setState({markers: [{key: 0, id:'origin',coordinate: {latitude: location.latitude, longitude: location.longitude}}]});
      }
      setTimeout(()=>{this.refs.origin.showCallout();},200);

    }else if(this.state.submit === 'end'){
      this.setState({end: location});
      if(this.state.markers.length === 1){
        this.setState({markers: this.state.markers.concat([{key: 1, id:'destination',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }else{
        this.setState({markers: this.state.markers.slice(0,1).concat([{key: 1, id:'destination',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }
    setTimeout(()=>{this.refs.destination.showCallout();},200);
    }
  };

  checkingIn = () => {
    this.setState({checkedIn: true, inRange: false});
  };

//handles the submit button being pressed and saves location as start then changes state to next save end
  submit = () => {
    if(this.state.markers.length > 0){
      if(this.state.submit === 'start'){
        this.props.actions.addStart(this.state.start);
        this.setState({submit: 'end', description: 'Confirm Destination'});
        this.refs.auto.refs.Auto.props.clearText();
        this.refs.origin.hideCallout();
      }else if(this.state.submit === 'end'){
        this.props.actions.addDestination(this.state.end);


        this.setState({show: false, submit: 'eta',description: 'Set your ETA'});
        this.refs.destination.hideCallout();


        const lat1 = this.state.start.latitude;
        const lat2 = this.state.end.latitude;
        const lng1 = this.state.start.longitude;
        const lng2 = this.state.end.longitude;
        const midpoint = calculateMidpoint(lat1, lng1, lat2, lng2);
        this.setState({region: {
          latitude: midpoint.lat,
          longitude:midpoint.lng,
          latitudeDelta: midpoint.latDelta,
          longitudeDelta:midpoint.lngDelta}});
      }
      // this.props.navigator.replace({name: 'map'});
    }
  };

  render() {
    const { state, actions, navigator } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.
    const { activeTrip } = this.props.state
    // var button = this.state.show ? <Button ref='button' style={styles.ButtonContainer} text={this.state.description} onPress={this.submit}></Button> : null;
    var checkIn = this.state.inRange ? <Button ref='button' style={styles.ButtonContainer} text='CHECK IN YO' onPress={this.checkingIn}></Button> : null;

    var checkedIn = this.state.checkedIn ? <SafetyButton elementText={"Thanks for letting us know that you've made it to your destination, " + state.user.name} buttonText={"Glad you're safe!"} /> : null;
    var autocomplete = this.state.show ?  <AutoComplete ref='auto' style={styles.autocomplete} selectPoint={(input)=>{this.changeRegion(input); this.setMarker(input);}} /> : null;
    var callout = this.state.show ?  <MapView.Callout><TouchableOpacity onPress={()=> {this.submit();}}><Text>Press to Confirm</Text></TouchableOpacity></MapView.Callout> : <MapView.Callout><Text>Why u Pressin me</Text></MapView.Callout>;
    var eta = this.state.submit === 'eta' ? <ETA startTrip={()=>{actions.startTrip; this.setState({submit:'tracking',description: 'Currently Tracking your Location'})}} tripState={state.activeTrip} userId={state.user.id}></ETA> : null

    return (
      <View style={stylesAlt.container}>


        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onLongPress={(e) => {this.setMarker(e.nativeEvent.coordinate)}}
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

        {/*<View style={{justifyContent: 'center',position: 'absolute', bottom: 0, alignItems: 'center', width: width, height: 20, backgroundColor: 'transparent'}}>
                  <TouchableOpacity
                    onPress={() => navigator.push({'name': 'settings', sceneConfig: 'FloatFromBottom'})}
                    activeOpacity={0.7}
                    style={[{flex: 0, justifyContent: 'center', bottom: 0, height: 60, width: width, borderWidth: 0, backgroundColor: 'transparent', opacity: 0.9}]}>
                    <View style={[{alignSelf: 'center', top: -10, width: 100, backgroundColor: 'gray'}, stylesAlt.triangle]}></View>
                    <View style={{alignSelf: 'center', bottom: 10, height: 20, width: width, backgroundColor: 'lightGray'}}></View>
                    <Text style={[styles.descriptionText, {position: 'absolute', width: width, left: 0, bottom: 25, fontSize: 16, backgroundColor: 'transparent', opacity: 1}]}>{'Guardian'}</Text>
                  </TouchableOpacity>
                </View>*/}
        <SlideUp
          style={{
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            width: width,
            height: 20,
            backgroundColor: 'transparent'
          }}
          navigator={navigator}
          nextScene='settings'
          label='Guardian'
          />

      </View>
    );
  }
};
