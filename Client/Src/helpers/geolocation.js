


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
    console.log('state in watch is: ', parent.props.state.user.onTrip);

    var watchID = navigator.geolocation.watchPosition((lastPosition) => {
        console.log('REDUX.USER.WATCHING' ,parent.props.state.user);
      let coords = lastPosition.coords;
      parent.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      addWaypoint(coords, parent.props.state.user.id);
      let distance = calculateDistance(parent.state.endPoint.latitude,
                                         parent.state.endPoint.longitude,
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

