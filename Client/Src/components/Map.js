
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,

  Image,
  TextInput,
} = React;

var calculateDistance = require('../helpers/calculate-distance');
var calculateMidpoint = require('../helpers/calculate-midpoint');
var MapView = require('react-native-maps');



// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;

// const SPACE = 0.01;
// let polyline = [
//         {
//           latitude: LATITUDE + SPACE,
//           longitude: LONGITUDE - SPACE,
//         },
//         {
//           latitude: LATITUDE - 2 * SPACE,
//           longitude: LONGITUDE + 2 * SPACE,
//         },
//         {
//           latitude: LATITUDE - SPACE,
//           longitude: LONGITUDE - SPACE,
//         },
//         {
//           latitude: LATITUDE - 2 * SPACE,
//           longitude: LONGITUDE - SPACE,
//         },];



/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var CreateTripContainer = React.createClass({
  componentDidMount: function(){
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
      console.log('waypoints',this.props.state.activeTrip.waypoints);
    });
  },

  render: function() {
    var {activeTrip} = this.props.state
    const markers = [{id:'origin',latitude:activeTrip.origin.latitude, longitude:activeTrip.origin.longitude},{id:'destination',latitude:activeTrip.destination.latitude, longitude:activeTrip.destination.longitude}];
    var distance = calculateDistance(markers[0].latitude,markers[0].longitude,markers[1].latitude,markers[1].longitude);
    var midpoint = calculateMidpoint(markers[0].latitude,markers[0].longitude,markers[1].latitude,markers[1].longitude)
    return (
          <MapView
            ref={'map'}
            style={styles.map}
            initialRegion={{latitude:midpoint.lat,longitude:midpoint.lng,latitudeDelta:1.2*Math.abs(activeTrip.origin.latitude - activeTrip.destination.latitude),longitudeDelta:1.2*Math.abs(activeTrip.origin.longitude - activeTrip.destination.longitude)}}
            annotations={markers}
            showsUsersLocation={true}
            rotateEnabled={false}>
            <MapView.Marker coordinate={markers[0]} ref={'origin'} title={'Origin'} />
            <MapView.Marker coordinate={markers[1]} ref={'destination'} title={'Destination'}/>
            <MapView.Polyline
            coordinates={this.props.state.activeTrip.waypoints}
            strokeColor="rgba(0,255,100,0.5"
            strokeWidth={5}
            lineDashPattern={[5, 2, 3, 2]}
            />
          </MapView>
    );
  }
});

var styles = StyleSheet.create({
  map: {
     flex:1
   }
})

module.exports = CreateTripContainer;
