



export function setMarkers (location, parent, appState) {
    if(parent.state.stage === 'setStart'){
      parent.setState({startPoint: location});
      if(parent.state.markers.length === 0){
        parent.setState({markers: parent.state.markers.concat([{key: 0, id:'origin',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }else{
        parent.setState({markers: [{key: 0, id:'origin',coordinate: {latitude: location.latitude, longitude: location.longitude}}]});
      }
      setTimeout(()=>{parent.refs.origin.showCallout();},200);

    }else if(parent.state.stage === 'setEnd'){
      parent.setState({endPoint: location});
      if(parent.state.markers.length === 1){
        parent.setState({markers: parent.state.markers.concat([{key: 1, id:'destination',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }else{
        parent.setState({markers: parent.state.markers.slice(0,1).concat([{key: 1, id:'destination',coordinate: {latitude: location.latitude, longitude: location.longitude}}])});
      }
    setTimeout(()=>{parent.refs.destination.showCallout();},200);
    }
  };