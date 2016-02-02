'use strict';

import { extend, isNull } from 'lodash';
var cssVar = require('cssVar');

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
const { width, height } = Dimensions.get('window');

// Components
import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';
import MapStart from '../components/create-trip-start';
import MapEnd from '../components/create-trip-end';
import Map from '../components/Map';
import Settings from '../components/Settings';

// import * as ROUTES from '../constants/routes';

// console.log("ROUTES", ROUTES);

const ROUTES = {
  signin: SignIn,
  home: Home,
  getLocation: CurrentLocation,
  startLocation: MapStart,
  endLocation: MapEnd,
  map: Map,
  home: MapStart,
  home: Settings,
  settings: Settings
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

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title || 'prev'}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    console.log("ROUTE for NExT", route.name);
    return (
      <TouchableOpacity
        onPress={() => navigator.push({name: route.name})}
        style={styles.navBarRightButton}>

        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {route.nextTitle || 'Next'}
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

};

class Main extends Component {
  constructor(props) {
    super(props);
  };


  renderScene(route, navigator){
    console.log('RENDERSCENE', route)
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
      <View style={{flex:1}}>
      <Navigator
        style={styles.navigator}
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
        // navigationBar={
        //   <Navigator.NavigationBar
        //     routeMapper={NavigationBarRouteMapper}
        //     style={styles.navBar}
        //   />
        // }
      />

      </View>
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
var styles = extend({}, styles, StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
})
);
