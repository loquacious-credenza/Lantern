'use strict';

import React, { Component, Navigator, StyleSheet } from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


// Components
import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';

var ROUTES = {
  signin: { view: SignIn, scene: 'FloatFromBottom' },
  home: { view: Home, scene: 'FloatFromBottom' },
  getLocation: { view: CurrentLocation, scene: 'FloatFromLeft' }
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

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator){
    let Component = ROUTES[route.name].view;
    let sceneConfig = SCENE_CONFIGS[ROUTES[route.name].scene]
    console.log("SCENE_CONFIGS", sceneConfig.toString())
    return <Component
      route={route}
      navigator={navigator}
      state={this.state}
      actions={this.actions}
      configureScene={sceneConfig}
      />;
  }

  render() {

    const { state, actions } = this.props;

        console.log(Object.keys(Navigator.SceneConfigs))
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
