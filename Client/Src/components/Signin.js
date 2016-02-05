'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';

// Component
import Login from './Login-button';

// importing styles
import styles from '../styles';
import { baseStyles } from '../styles-base';

export default class SignIn extends Component {
  render() {
    const { actions, state, navigator } = this.props;
    return (
      <View style={[baseStyles.bgGray1]} >
        <View style={baseStyles.absoluteCenter}>
          <Text>Guardian</Text>
          <Login navigator={navigator} actions={actions}/>
        </View>
      </View>
    );
  }
};

