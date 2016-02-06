'use strict';

import React, {
  Component,
} from 'react-native';

var PasswordGesture = require('react-native-gesture-password');


export default class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
          message: 'Please input your password.',
          status: 'normal'
      }
  }

  onEnd = (password) => {
      if (password == '123') {
          this.setState({
              status: 'right',
              message: 'Password is right, success.'
          });

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
                rightColor={'green'}
                wrongColor={'red'}
        />
    );
  }
}

