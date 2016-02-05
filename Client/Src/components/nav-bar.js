'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import IconButton from './icon-button';

class Right extends Component {
  constructor(props){
    super(props)
  }

  render() {

    const {
      image,
      actions,
      navigator,
      route,
      label,
      style
    } = this.props;
    const { onPress } = actions;

    return (
      <View style={style}>
      <IconButton
        image={image}
        actions={{onPress}}
        navigator={navigator}
        route={route}
        label={label}
        />
      </View>
    );
  }
}

class Left extends Component {
  constructor(props){
    super(props)
  }

  render() {

    const {
      image,
      actions,
      navigator,
      route,
      label,
      style
    } = this.props;
    const { onPress } = actions;

    return (
      <View style={style}>
      <IconButton
        image={image}
        actions={{onPress}}
        navigator={navigator}
        route={route}
        label={label}
        />
      </View>
    );
  }
}

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      navigator,
      description,
      right,
      left,
      style
    } = this.props;

    const rightSide = right ?
      <Right
        style={[styles.navLinkStyle, internalStyle.rightSide]}
        navigator={navigator}
        image={right && right.image}
        actions={{onPress: right.action}}
        label={right.label || null}
        /> : null;

    const leftSide = left ?
      <Left
        style={[styles.navLinkStyle, internalStyle.leftSide]}
        navigator={navigator}
        image={left && left.image}
        actions={{onPress: left.action}}
        label={left.label || null}
        /> : null;

    return (
      <View style={[styles.navBarContainer, style]}>
        <Text
          style={styles.navBarText}>
          {description}
        </Text>
        {rightSide}
        {leftSide}
      </View>
    );
  }
}

// Component Styles
let styles = StyleSheet.create(require('../styles.js'));
const internalStyle = StyleSheet.create({

  rightSide: {
    right: 0
  },
  leftSide: {
    left: 0
  },

});
