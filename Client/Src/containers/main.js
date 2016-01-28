'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import CurrentLocation from '../components/get-location';
import * as actions from '../actions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <CurrentLocation
        location={state}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.currentLocation
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Main);
