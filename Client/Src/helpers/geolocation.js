


const calculateDistance = require('./calculate-distance');



export function getCurrentPosition (successCallback, errorCallback) {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => successCallback({initialPosition}), // success callback
      (error) => errorCallback(error.message), // failure callback
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
    );
  };

    // Repeatedly track position
export function watchPosition (parent) {
    var watchID = navigator.geolocation.watchPosition((lastPosition) => {
      let coords = lastPosition.coords;
      parent.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      if(parent.state.stage === 'tracking'){
        let distance = calculateDistance(parent.state.endPoint.latitude, parent.state.endPoint.longitude, lastPosition.coords.latitude, lastPosition.coords.longitude);
        if(distance <= 0.2){
          parent.setState({inRange: true});
        }
      }
    });
  };

