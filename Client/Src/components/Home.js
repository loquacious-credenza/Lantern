'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';

export default class Home extends Component {
  // componentDidMount = () => { 
  //   setTimeout(()=>{ this.props.navigator.push({name:'map'}) },2000)
  // };
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} >Guardian</Text>
        <Text>Hello {this.props.state.user.name}</Text>
      </View>
    );
  }
};

// importing styles
var styles = StyleSheet.create(require('../styles.js'));
