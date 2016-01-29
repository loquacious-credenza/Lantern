'use strict';

import React, { Component } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin.js' // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY


/// UNCOMMENT BELOW TO CHECK CURRENT LOCATION ------------------------------------------------------------------

// class Main extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const { state, actions } = this.props;
//     return (
//       <CurrentLocation
//         location={state}
//         {...actions} />
//     );
//   }
// }

/// UNCOMMENT ABOVE TO CHECK CURRENT LOCATION ------------------------------------------------------------------

/// UNCOMMENT BELOW TO CHECK LOGIN COMPONENT -------------------------------------------------------------------
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <SignIn
        user={state}
        {...actions} />
    );
  }
}

/// UNCOMMENT ABOVE TO CHECK LOGIN COMPONENT -------------------------------------------------------------------


export default connect(state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main);
