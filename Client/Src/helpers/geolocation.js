


const calculateDistance = require('./calculate-distance');
const {throttle} = require('lodash');

import {AsyncStorage, Alert} from 'react-native';



export function getCurrentPosition (parent, success) {

    return navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        parent.props.actions.getCurrentLocation({
          latitude:initialPosition.coords.latitude,
          longitude:initialPosition.coords.longitude,
          timestamp:initialPosition.timestamp
        })

        success();
            // parent.props.navigator.replace({
            //   name: nextRoute,
            //   currentLocation: initialPosition
            // });
        
        // AsyncStorage.getItem('tutorial').then((response)=>{
        //   if(response === null || response === true){
        //     parent.props.navigator.replace({
        //       name: 'home',
        //       currentLocation: initialPosition
        //     });
        //   }
        //   else {
        //     parent.props.navigator.replace({
        //       name: 'home',
        //       currentLocation: initialPosition
        //     });
        //   }
        }, // success callback
      (error) => Alert.alert('Not Getting Location',error.message), // failure callback
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
    );
  };


export function getGeolocationForMarkers (successCallback, errorCallback) {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => successCallback({initialPosition}), // success callback
      (error) => errorCallback(error.message), // failure callback
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
    );
  };

    // Repeatedly track position
// var throttledLocationSend = throttle(function(){
//     addWaypoint.call(null,arguments);
//   },1000);

export function watchPosition (parent, user) {
    const addWaypoint = parent.props.actions.addWaypoint;
    const confirmInRange = parent.props.actions.confirmInRange;
    var watchID = navigator.geolocation.watchPosition((lastPosition) => {
      let coords = lastPosition.coords;
      parent.props.actions.getCurrentLocation({
        latitude: coords.latitude, 
        longitude:coords.longitude, 
        timestamp:lastPosition.timestamp
      });
      addWaypoint(coords, parent.props.state.user.id);
      console.log('watching', parent.props.state.activeTrip.stage)
      if(parent.props.state.activeTrip.stage === 'tracking'){
      let distance = calculateDistance(parent.props.state.activeTrip.markers[1].coordinate.latitude, 
                                         parent.props.state.activeTrip.markers[1].coordinate.longitude, 
                                         lastPosition.coords.latitude, 
                                         lastPosition.coords.longitude);
        if(distance <= 0.25 && parent.props.state.user.onTrip){
          confirmInRange();
        }
      }

      if(parent.props.state.activeTrip.stage === 'setDestination'){
        console.log('should clear watchID')
        navigator.geolocation.clearWatch(watchID);
      }
    });
  };

