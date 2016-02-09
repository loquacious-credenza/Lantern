'use strict';

import { extend, isNull } from 'lodash';

import React, {
  Component,
  Navigator,
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
// Components
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';
import MapStart from '../components/create-trip-start';
import Settings from '../components/Settings';
import Guardian from '../components/Guardian';
import PasscodeConfirm from '../components/PasscodeConfirm';
import PasscodeSet from '../components/PasscodeSet';
import Tutorial from '../components/tutorial-overlay';

// import * as ROUTES from '../constants/routes';

// console.log("ROUTES", ROUTES);

const ROUTES = {
  signin: SignIn,
  startLocation: MapStart,
  home: MapStart,
  settings: Settings,
  guardian: Guardian,
  passcodeConfirm: PasscodeConfirm,
  passcodeSet: PasscodeSet,
  tutorial: Tutorial
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
  };


  renderScene(route, navigator){
    let Component = ROUTES[route.name];
    return <Component
      route={route}
      navigator={navigator}
      state={this.state}
      actions={this.actions}
      />
  }

  render() {

    const { state, actions } = this.props;

    return (
      <View style={baseStyles.FullScreen}>
      <Navigator style={baseStyles.FullScreen}
        initialRoute={{name: 'signin', sceneConfig: 'FloatFromBottom'}}
        state={state}
        actions={actions}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return Navigator.SceneConfigs[route.sceneConfig];
          }
          return Navigator.SceneConfigs.PushFromRight;
        }}
        />

      </View>
    );
  }
}


export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Main);


