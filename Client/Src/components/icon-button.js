'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));

const icons = {
  rightArrow: require('../assets/half-arrow-right-7white.png'),
  upArrow: 'later',
  leftArrow: require('../assets/half-arrow-left-7white.png'),
  shield: require('../assets/shieldwhite.png'),
  gear: require('../assets/gear-7white.png'),
  bike: "addlater",
  walk: "addlater",
  car: "addlater"
}

export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, actions, navigator, route, label } = this.props;
    const { onPress } = actions; // destructure the actions the components uses to update state.

    // if image is undefined check for text
    // if label is undefined, hide element
    let icon = icons[image] ? <Image source={icons[image]} /> : null;
    let text = label ? <Text>{label.trim()}</Text> : null;

    let show =
      (text !== null || icon !== null) ?
      <TouchableOpacity
        style={{justifyContent: 'flex-end'}}
        onPress={onPress}>
        {icon}
        {text}
      </TouchableOpacity> :
      null;

    return (
      <View style={style}>{show}</View>
    );
  }
}

const style={
 flex: 1,
 backgroundColor: 'transparent',
 justifyContent: 'flex-end',
 alignItems: 'center'
};
