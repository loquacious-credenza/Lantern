'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import * as base from '../styles-base';

import { extend } from 'lodash';

const { width, height } = Dimensions.get('window');
// importing styles
const styles = StyleSheet.create({
  triangle: {
    width:0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: base.Primary2
  },
  sliderTip: {
    alignSelf: 'center',
    top: -10,
    width: 100,
    backgroundColor: 'gray'
  },
  sliderBody: {
    alignSelf: 'center',
    bottom: 10,
    height: 40,
    width: width,
    backgroundColor: base.Primary2
  },
  sliderText: {
    position: 'absolute',
    textAlign: 'center',
    width: width,
    bottom: 25,
    fontSize: 16,
    color:'white',
    backgroundColor: 'transparent'
  },
  sliderContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: width,
    height: 30,
    backgroundColor: 'transparent'
  },
  slider: {
    flex: 0,
    justifyContent: 'center',
    bottom: 0,
    height: 60,
    width: width,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
});


export default class SlideUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigator,
      nextScene,
      label
    } = this.props;

    return (
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          onPress={() => navigator.push({'name': nextScene, sceneConfig: 'FloatFromBottom'})}
          activeOpacity={0.7}
          style={styles.slider}>
          <View style={[styles.sliderTip, styles.triangle]}></View>
          <View style={styles.sliderBody}></View>
          <Text style={styles.sliderText}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
