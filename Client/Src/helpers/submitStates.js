var calculateMidpoint = require('./calculate-midpoint');


export function  submitStart (parent) {
  if(parent.state.markers.length > 0){
    parent.props.actions.addStart(parent.state.startPoint);
    console.log("PARENT STATE", parent.state.startPoint, parent.state.markers);
    parent.props.actions.addMarker(parent.state.markers[0]);
    parent.setState({stage: 'setEnd', description: 'Confirm Destination'});
    parent.refs.auto.refs.Auto.props.clearText();
    parent.refs.origin.hideCallout();
  }
};


export function submitEnd (parent) {
  if(parent.state.markers.length > 1){
    parent.props.actions.addDestination(parent.state.endPoint);
    parent.props.actions.addMarker(parent.state.markers[1]);
    parent.setState({show: false, stage: 'eta',description: 'Set your ETA'});
    parent.refs.destination.hideCallout();


    const lat1 = parent.state.startPoint.latitude;
    const lat2 = parent.state.endPoint.latitude;
    const lng1 = parent.state.startPoint.longitude;
    const lng2 = parent.state.endPoint.longitude;
    const midpoint = calculateMidpoint(lat1, lng1, lat2, lng2);
    parent.setState({region: {
      latitude: midpoint.lat,
      longitude:midpoint.lng,
      latitudeDelta: midpoint.latDelta,
      longitudeDelta:midpoint.lngDelta}});
  }
};
