
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



/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var CreateTripContainer = React.createClass({
  componentDidMount: function(){
    console.log(this.refs.origin.showCallout);
  },
  render: function() {
    var {activeTrip} = this.props.state
    const markers = [{id:'origin',latitude:activeTrip.origin.latitude, longitude:activeTrip.origin.longitude},{id:'destination',latitude:activeTrip.destination.latitude, longitude:activeTrip.destination.longitude}];
    var distance = calculateDistance(markers[0].latitude,markers[0].longitude,markers[1].latitude,markers[1].longitude);
    var midpoint = calculateMidpoint(markers[0].latitude,markers[0].longitude,markers[1].latitude,markers[1].longitude)
    return (
          <MapView 
            showUsersLocation={true}
            style={styles.map}
            initialRegion={{latitude:midpoint.lat,longitude:midpoint.lng,latitudeDelta:1.2*Math.abs(activeTrip.origin.latitude - activeTrip.destination.latitude),longitudeDelta:1.2*Math.abs(activeTrip.origin.longitude - activeTrip.destination.longitude)}}
            annotations={markers}
            rotateEnabled={false}>
            <MapView.Marker coordinate={markers[0]} ref={'origin'} title={'Origin'} />
            <MapView.Marker coordinate={markers[1]} ref={'destination'} title={'Destination'}/>
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
