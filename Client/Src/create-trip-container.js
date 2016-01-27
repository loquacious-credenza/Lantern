
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} = React;

var MapView = require('react-native-maps');
var StartEndInput = require('./create-trip-start-end')

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var CreateTripContainer = React.createClass({
  render: function() {
    return (
          <MapView 
            style={styles.map}
            showsUserLocation={true} 
            followUserLocation={true}>
            <StartEndInput></StartEndInput>
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
