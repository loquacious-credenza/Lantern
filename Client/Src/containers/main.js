'use strict';

import React, { Component, Navigator, StyleSheet, AsyncStorage } from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


// Components
import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';
import MapStart from '../components/create-trip-start';
import MapEnd from '../components/create-trip-end';

var ROUTES = {
  signin: { view: SignIn, scene: 'FloatFromBottom' },
  home: { view: Home, scene: 'FloatFromBottom' },
  getLocation: { view: CurrentLocation, scene: 'FloatFromLeft' },
  startLocation: { view: MapStart, scene: 'FloatFromLeft' },
  endLocation: { view: MapEnd, scene: 'FloatFromLeft' }
};

const SCENE_CONFIGS = {
  default: (route, routeStack) => Navigator.SceneConfigs.FloatFromRight,
  PushFromRight: (route, routeStack) => Navigator.SceneConfigs.PushFromRight,
  FloatFromRight: (route, routeStack) => Navigator.SceneConfigs.FloatFromRight,
  FloatFromLeft: (route, routeStack) => Navigator.SceneConfigs.FloatFromLeft,
  FloatFromBottom: (route, routeStack) => Navigator.SceneConfigs.FloatFromBottom,
  // FloatFromBottomAndroid: (route, routeStack) => Navigator.SceneConfigs.FloatFromBottomAndroid,
  FadeAndroid: (route, routeStack) => Navigator.SceneConfigs.FadeAndroid,
  HorizontalSwipeJump: (route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump,
  HorizontalSwipeJumpFromRight: (route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJumpFromRight,
  VerticalUpSwipeJump: (route, routeStack) => Navigator.SceneConfigs.VerticalUpSwipeJump,
  VerticalDownSwipeJump: (route, routeStack) => Navigator.SceneConfigs.VerticalDownSwipeJump
}

// var INITIALROUTE = {
//   name: 'signin',
//   scene: 'FloatFromRight'
// }

class Main extends Component {
  constructor(props) {
    super(props);
  };

//   componentWillMount(){
//     AsyncStorage.multiGet(['userName','userID']).then((response) => {
//       // THIS IS WHERE WE CHECK TO SEE IF THE USER ON THIS DEVICE HAS PREVIOUSLY LOGGED IN
//         if(response[0][1] !== null){
//           // IF WE HAVE DATA, THERE IS NO NEED TO MAKE FACEBOOK GRAPH CALL
//           this.props.actions.login({name:response[0][1],id:response[1][1]});
//           INITIALROUTE.name = 'home'
//         } else {
//           // IF WE DON'T HAVE DATA, NEED TO PROCEED WITH LOGGING IN VIA FACEBOOK

//         }
//   })
// }


  renderScene(route, navigator){
    let Component = ROUTES[route.name].view;
    let sceneConfig = SCENE_CONFIGS[ROUTES[route.name].scene]
    return <Component
      route={route}
      navigator={navigator}
      state={this.state}
      actions={this.actions}
      configureScene={sceneConfig}/>;
  }

  render() {

    const { state, actions } = this.props;

    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{name: 'signin', scene: 'FloatFromRight'}}
        state={state}
        actions={actions}
        renderScene={this.renderScene}
        configureScene={SCENE_CONFIGS['FloatFromBottom'] || SCENE_CONFIGS.default}
      />
    );
  }
}

/// UNCOMMENT ABOVE TO CHECK LOGIN COMPONENT -------------------------------------------------------------------

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Main);

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
