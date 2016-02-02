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
      route
    } = this.props;

    const rightSide = right ?
      <Right
        style={[styles.navLinkStyle, styles.rightSide]}
        navigator={navigator}
        image={right && right.image}
        actions={{onPress: right.action}}
        route={route && route.next ? route.next : null}
        label={right.label || null}
        /> : null;

    const leftSide = left ?
      <Left
        style={[styles.navLinkStyle, styles.leftSide]}
        navigator={navigator}
        image={left && left.image}
        actions={{onPress: left.action}}
        route={route && route.next ? route.next : null}
        label={left.label || null}
        /> : null;

    return (
      <View style={styles.navBarContainer}>
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
const { width, height } = Dimensions.get('window');
const NAV_HEIGHT = 60;
const LINK_WIDTH = 50;
const NAV_BAR_PADDING = 5;
styles = {
  navBarContainer: {
    flex: 0,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: NAV_HEIGHT,
    backgroundColor: '#eeeeee',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  navLinkStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    bottom: 0,
    width: LINK_WIDTH,
    height: NAV_HEIGHT,
    paddingBottom: NAV_BAR_PADDING
  },
  rightSide: {
    right: 0
  },
  leftSide: {
    left: 0
  },
  navBarText: {
    flex: 0,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    width: width,
    alignSelf: 'flex-end',
    fontSize: 18,
    backgroundColor: 'transparent',
    paddingBottom: NAV_BAR_PADDING
  }
};
