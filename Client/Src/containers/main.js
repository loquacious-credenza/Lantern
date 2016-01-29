'use strict';

import React, { Component, Navigator, StyleSheet } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


// Components
import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';

var ROUTES = {
  signin: SignIn,
  home: Home,
  getLocation: CurrentLocation
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator){
    console.log('RENDER SCENE',route.name);
    let Component = ROUTES[route.name];
    console.log('COMPONENT', Component);
    return <Component route={route} navigator={navigator} actions={actions}/>;
  }

  render() {

    const { currentLocation, user, actions } = this.props;
    console.log('HAOOY', currentLocation);
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
}

/// UNCOMMENT ABOVE TO CHECK LOGIN COMPONENT -------------------------------------------------------------------


export default connect(state => ({
    user: state.user,
    currentLocation: state.currentLocation
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main);

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
