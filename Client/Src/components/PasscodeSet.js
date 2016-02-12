'use strict';

import React, {
  Component,
  AsyncStorage,
} from 'react-native';
import * as base from '../styles-base';


var PasswordGesture = require('react-native-gesture-password');
var Password1 = '';

export default class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
          message: 'Please set a password.',
          status: 'normal'
      }
  }
  onEnd = (password) => {
      if ( Password1 === '' ) {
          // The first password
          Password1 = password;
          this.setState({
              status: 'normal',
              message: 'Please confirm your password.'
          });
      } else {
          // The second password
          if ( password === Password1 ) {
              this.setState({
                  status: 'right',
                  message: 'Thank You your password is now set'
              });
              this.props.actions.setPassword({
                id: this.props.state.user.id,
                password
              });
              this.props.navigator.replace({name: 'home'});
              // your codes to close this view
          } else {
              this.setState({
                  status: 'wrong',
                  message:  'Not the same, try again.'
              });
              Password1 = '';
          }
      }
  };
  onStart = () => {
      if ( Password1 === '') {
          this.setState({
              message: 'Please input your password.'
          });
      } else {
          this.setState({
              message: 'Please confirm your password.'
          });
      }
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
