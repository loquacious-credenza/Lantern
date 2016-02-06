


const calculateDistance = require('./calculate-distance');
const {throttle} = require('lodash');




export function getCurrentPosition (successCallback, errorCallback) {
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
    var watchID = navigator.geolocation.watchPosition((lastPosition) => {
        console.log('REDUX.USER.WATCHING' ,parent.props.state.user);
      let coords = lastPosition.coords;
      parent.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      addWaypoint(coords, parent.props.state.user.id);
      let distance = calculateDistance(parent.state.endPoint.latitude,
                                         parent.state.endPoint.longitude,
                                         lastPosition.coords.latitude,
                                         lastPosition.coords.longitude);
        if(distance <= 0.25){
          parent.setState({inRange: true});
        }
    });
    if(parent.state.stage === 'setStart'){
      navigator.geolocation.clearWatch(watchID);
    }
  };

