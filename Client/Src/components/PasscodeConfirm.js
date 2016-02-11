'use strict';

import React, {
  Component,
} from 'react-native';
import * as base from '../styles-base';


var PasswordGesture = require('react-native-gesture-password');

var geolocation = require('../helpers/geolocation');


export default class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
          message: 'Please input your password.',
          status: 'normal',
          password: this.props.state.user.password
      }
  }

  onEnd = (password) => {
      if (password == this.state.password) {
          this.setState({
              status: 'right',
              message: 'Password is right, success.'
          });

          this.props.actions.setStage('setDestination');
          this.props.actions.checkIn(this.props.state.user.id);
          this.props.navigator.pop();

          // TO DO: UNDERSTAND WHY THIS IS IMPORTANT AND FIX IT
          // geolocation.getCurrentPosition(this, ()=>{
          //   this.props.navigator.replace({name:'home'})
          // });
          // your codes to close this view
      } else {
          this.setState({
              status: 'wrong',
              message: 'Password is wrong, try again.',
          });
      }
  };
  onStart = () => {
      this.setState({
          status: 'normal',
          message: 'Please input your password.'
      });
  };

  render() {
    const { state, actions } = this.props;

    return (
        <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                rightColor={base.Primary0}
                wrongColor={base.Accent0}
        />
    );
  }
}

