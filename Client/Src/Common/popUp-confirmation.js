'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
import Button from '../Common/Button';


var popUpAlert = React.createClass({

  render: function() {
    return (
      <View style={[baseStyles.container, baseStyles.absoluteCenter]}>
        <View style={styles.popUpAlertContainer}>
        <Text style={styles.popUpText}>{this.props.elementText}</Text>
        {this.props.extra}
        <Button alert={true} text={this.props.buttonText} onPress={this.props.onPress}/>
        </View>
      </View>
    );
  }

});

module.exports = popUpAlert;
