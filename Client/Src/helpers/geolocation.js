


const calculateDistance = require('./calculate-distance');
const {throttle} = require('lodash');




export function getCurrentPosition (parent) {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        parent.props.navigator.replace({
          name: 'home',
          currentLocation: initialPosition
        });
      }, // success callback
      (error) => Alert(error.message), // failure callback
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
      parent.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      addWaypoint(coords, parent.props.state.user.id);

      let distance = calculateDistance(parent.props.state.activeTrip.markers[1].coordinate.latitude, 
                                         parent.props.state.activeTrip.markers[1].coordinate.longitude, 
                                         lastPosition.coords.latitude, 
                                         lastPosition.coords.longitude);
        if(distance <= 0.25 && parent.props.state.user.onTrip){
          confirmInRange();
        }
    });
    if(parent.state.stage === 'setStart'){
      navigator.geolocation.clearWatch(watchID);
    }
  };

