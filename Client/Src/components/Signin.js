'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Image
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
       <Image source={require('../assets/background.jpeg')} style={[baseStyles.absoluteCenter]}>
        <View style={baseStyles.absoluteCenter}>
        </View>
        <View style={baseStyles.absoluteCenter}>
          <Login navigator={navigator} actions={actions}/>
        </View>
        </Image>
    );
  }
};

