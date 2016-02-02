


const calculateDistance = require('./calculate-distance');



export function getCurrentPosition (successCallback, errorCallback) {
  console.log('GETCURRENTPOSITION HELPER');
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => successCallback({initialPosition}), // success callback
      (error) => errorCallback(error.message), // failure callback
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
    );
  };

    // Repeatedly track position
export function watchPosition (parent) {
    var watchID = navigator.geolocation.watchPosition((lastPosition) => {
    console.log('WATCHPOSITION HELPER',lastPosition)
      let coords = lastPosition.coords;
      parent.props.actions.getCurrentLocation({latitude: coords.latitude, longitude:coords.longitude, timestamp:lastPosition.timestamp});
      if(parent.state.submit === 'tracking'){
        let distance = calculateDistance(parent.state.end.latitude, parent.state.end.longitude, lastPosition.coords.latitude, lastPosition.coords.longitude);
        if(distance <= 0.2){
          parent.setState({inRange: true});
        }
      }
    });
  };

