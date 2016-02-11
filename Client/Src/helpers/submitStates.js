var calculateMidpoint = require('./calculate-midpoint');


export function  submitStart (parent) {
  // NOT USED
  if(parent.state.markers.length > 0){
    parent.props.actions.addStart(parent.state.startPoint);
    parent.props.actions.addMarker(parent.state.markers[0]);
    parent.setState({stage: 'setEnd', description: 'Confirm Destination'});
    parent.refs.auto.refs.Auto.props.clearText();
    parent.refs.origin.hideCallout();
  }
};


export function submitEnd (parent) {
  // if(parent.state.markers.length > 1){
  //   parent.props.actions.addDestination(parent.state.endPoint);
  //   parent.props.actions.addMarker(parent.state.markers[1]);
    parent.refs.destination.hideCallout();
    console.log('SUBMIT', parent.props.state)

    var points = parent.props.state.activeTrip.markers;


    const lat1 = points[0].coordinate.latitude;
    const lat2 = points[1].coordinate.latitude;
    const lng1 = points[0].coordinate.longitude;
    const lng2 = points[1].coordinate.longitude;
    const midpoint = calculateMidpoint(lat1, lng1, lat2, lng2);
    parent.setState({region: {
      latitude: midpoint.lat,
      longitude:midpoint.lng,
      latitudeDelta: midpoint.latDelta,
      longitudeDelta:midpoint.lngDelta}});
  // }
};

export function routeRefreshView (input) {
    const lat1 = input.origin.latitude;
    const lat2 = input.destination.latitude;
    const lng1 = input.origin.longitude;
    const lng2 = input.destination.longitude;
    const midpoint = calculateMidpoint(lat1, lng1, lat2, lng2);
    return{
      latitude: midpoint.lat,
      longitude:midpoint.lng,
      latitudeDelta: midpoint.latDelta,
      longitudeDelta:midpoint.lngDelta};
  // }
};
