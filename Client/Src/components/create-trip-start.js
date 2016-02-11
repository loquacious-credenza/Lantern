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
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import { getCurrentPosition, watchPosition } from '../helpers/geolocation';
import { submitStart, submitEnd, routeRefreshView } from '../helpers/submitStates';
import { setMarkers } from '../helpers/setMarker';
import MapView from 'react-native-maps';
import AutoComplete from '../Common/AutoComplete';
import Button from '../Common/Button';
import ETA from '../Common/eta-confirmation';
import PopUpAlert from '../Common/popUp-confirmation';
import SlideUp from './slide-up';
import NavBar from './nav-bar';
import Timer from '../Common/timer-overlay';

const styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class MapStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload:false,
      region: {
        latitude: this.props.state.currentLocation.latitude,
        longitude:this.props.state.currentLocation.longitude,
        latitudeDelta: .2,
        longitudeDelta: .2 / ASPECT_RATIO
      },
    }
  }
  onRegionChange = (region) => {
    this.setState({ region: region });
  };
  componentDidMount() {
    setTimeout(() => {
      console.log('mounting', this.props.state)
      if(!this.props.state.user.password){
        this.props.navigator.push({name: 'passcodeSet'});
      }
    }, 300);
    ///////////////////////////////////////////////////////
    // THIS CALL TO ASYNC STORAGE NEEDS TO BE DELETED
    // IT IS BEING USED FOR CLEARING AN ACTIVE TRIP WHILE TESTING PASSCODE.
    // AsyncStorage.multiSet([
    //   ['onTrip', JSON.stringify('false')],
    //   ['activeTrip', JSON.stringify(null)],
    //   ['password', JSON.stringify('')]
    //   ]);


    if (this.props.state.activeTrip.stage === 'tracking'){
      console.log('there is an active trip', this.props.state.activeTrip)
      const { stage, markers, origin, destination} = this.props.state.activeTrip;
      setTimeout(()=>{
      this.setState({reload: true});
      },100)
    }
  }

  reloadTrip = () => {
    const { stage, markers, origin, destination} = this.props.state.activeTrip;
      this.props.actions.addMarkerStart({
        destination: destination,
        origin: origin,
      });

      this.setState({region: routeRefreshView({
        destination: destination,
        origin: origin,
        })
      });
      watchPosition(this,this.props.state.user)
      this.setState({reload: false});

  };

  // TO DO: MOVE FROM COMPONENT STATE TO REDUX STATE
  changeRegion = (location) => {
    this.setState({region: {
      latitude: location.latitude,
      longitude:location.longitude,
      latitudeDelta: .005,
      longitudeDelta: .005 / ASPECT_RATIO}});
  };

  // //snaps view to location sets markers on start and end also adjust for marker changes before submit.
  // setMarker = (location, state) => {
  //   setMarkers(location, this, state);
  //   //setMarkers(location, this);
  // };

  checkingIn = () => {
      this.props.actions.setDescription('Enter your destination');
      this.props.navigator.push({ name: 'passcodeConfirm' });


    // actions.checkIn(state.user.id);


    // These need to be read from redux state.


    // this.setState({checkedIn: true, inRange: false});
  };

//handles the submit button being pressed and saves location as start then changes state to next save end
  submit = () => {
    this.props.actions.setStage('setEta')
    this.refs.destination.hideCallout();
    submitEnd(this);
  };

  addMarker = (location) => {
    this.props.actions.addMarker(location);
    var that = this;
    setTimeout(()=>{
    that.props.actions.setStage('marker')
      that.refs.destination.showCallout();
    }, 600)
  };

  render() {

    const { state, actions, navigator } = this.props;
    const { currentLocation, user } = state; //destructure the parts of state that you need
    const { getCurrentLocation, addMarker } = actions; // destructure the actions the components uses to update state.
    const { activeTrip } = this.props.state;


    // console.log('STATE: ', state);
    // var button = this.state.show ? <Button ref='button' style={styles.ButtonContainer} text={this.state.description} onPress={this.submit}></Button> : null;

    var currentTrip = this.state.reload ?
    <PopUpAlert elementText={"We have detected that you are on an active trip."}
        buttonText={"Load Trip!"}
        onPress={()=>{
          this.reloadTrip();
        }}
    /> : null;

    var checkIn = state.activeTrip.inRange ?
    <PopUpAlert elementText={"We have detected that you are close to your destination"}
        buttonText={"I'm safe!"}
        onPress={()=>{
          this.checkingIn();
          // actions.checkIn(state.user.id)
        }}
    /> : null;

    var autocomplete = !state.user.onTrip ?
      <View style={[baseStyles.component, styles.autoComplete]}>
        <AutoComplete ref='auto'
          selectPoint={(input)=>{this.changeRegion(input);
            this.addMarker(input);}}
        />
      </View> : null;

    var eta = (state.activeTrip.stage === 'setEta' && !state.user.onTrip) ?// === 'eta' ?
      <ETA startTrip={(payload)=> {
          actions.startTrip(payload);
          actions.setDescription('Currently Tracking your Location')
          // this.setState({
          //   description: 'Currently Tracking your Location'
          // });
          actions.setStage('tracking');
          watchPosition(this, this.props.state.user);
        }}
        tripState={state.activeTrip}
        userId={state.user.id}
        acceptableDelay={state.user.acceptableDelay}
        >
      </ETA> : null;


    var callout = (this.props.state.activeTrip.stage === 'setDestination' ||
      this.props.state.activeTrip.stage === 'marker' )?
      <MapView.Callout>
        <TouchableOpacity
        onPress={()=> {
          this.submit();
        }}
        >
          <Text>Press to Confirm</Text>
        </TouchableOpacity>
      </MapView.Callout>: <MapView.Callout>
      <Text></Text>
      </MapView.Callout>;



    // var destination = this.state.show ?
    //   state.activeTrip.markers.map(marker => (
    //     <MapView.Marker
    //       key={marker.key}
    //       coordinate={marker.coordinate}
    //       ref={marker.id}
    //       title={marker.id}
    //       onDragEnd={(e) => {this.addMarker(e.nativeEvent.coordinate)}}
    //       draggable>
    //       {callout}
    //     </MapView.Marker>
    //   ))
    // : null;

    // var destination = state.activeTrip.stage === 'marker' ?

    //   <MapView.Marker
    //     coordinate={state.activeTrip.markers[1].coordinate}
    //     ref={state.activeTrip.markers[1].id}
    //     title={state.activeTrip.markers[1].id}
    //     onDragEnd={(e) => {this.addMarker(e.nativeEvent.coordinate)}}
    //     draggable>
    //     {callout}
    //   </MapView.Marker>
    // : null;

    var timer = state.user.onTrip ?
    <Timer
      state = {activeTrip}>
    </Timer> : null;

          // {state.activeTrip.markers.map(marker => (
          //   <MapView.Marker
          //     key={marker.key}
          //     coordinate={marker.coordinate}
          //     ref={marker.id}
          //     title={marker.id}
          //     onDragEnd={(e) => {this.setMarker(e.nativeEvent.coordinate, state)}}
          //     draggable>
          //     {callout}
          //   </MapView.Marker>
          // ))}
    return (
      <View style={baseStyles.navContainer}>
      <View style={[baseStyles.container]}>
        <MapView
          style={baseStyles.container}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onLongPress={(e) => {
            this.addMarker(e.nativeEvent.coordinate)
          }}
          onPress={()=> {if(!state.user.onTrip){this.refs.auto.refs.Auto.setState({listViewDisplayed: false}); this.refs.auto.refs.Auto.triggerBlur();}}}
        >
          {state.activeTrip.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              ref={marker.id}
              title={marker.id}
              onDragEnd={(e) => {this.addMarker(e.nativeEvent.coordinate)}}
              draggable>
              {callout}
            </MapView.Marker>
          ))}
        </MapView>

        <NavBar
          navigator={navigator}
          description={activeTrip.description}
          right={{
            image: 'gear',
            action: () => navigator.push({
              name: 'settings'
            })
          }}
          left={{
            image: 'shield',
            action: () => navigator.push({
              name: 'tutorial',
              sceneConfig: 'FloatFromLeft'
            })
          }}
          />

        <View style={[baseStyles.component]}>
          {autocomplete}
        </View>

        {currentTrip}

        {eta}

        {timer}

        {checkIn}




        <SlideUp
          navigator={navigator}
          nextScene='guardian'
          label='Guardian'
          />

      </View>
      </View>
    );
  }

};

// var checkedIn = this.state.checkedIn ?
//   <PopUpAlert elementText={"Thanks for letting us know that you've made it to your destination, " + state.user.name}
//     buttonText={"End Trip"} /> : null;
