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

// importing styles
const styles = StyleSheet.create(require('../styles.js'));
const { width, height } = Dimensions.get('window');

const icons = {
  // rightArrow: '../assets/half-arrow-right-7.png'
  rightArrow: require('../assets/half-arrow-right-7.png'),
  gear: require('../assets/gear-7.png')
}

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      navigator,
      // actions,
      description,
      right
    } = this.props;
   // let rightAlt = '../assets/half-arrow-right-7.png';



    // const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.
    return (
      <View style={{position: 'absolute', top: 0, alignItems: 'center', width: width, height: 60, backgroundColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: 'black'}}>
        <Text style={[styles.descriptionText, {fontWeight: 'bold', top: 30, alignSelf: 'center', marginTop: 0, fontSize: 18, backgroundColor: '#eeeeee'}]}>{description}</Text>
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={[styles.saveButton, {marginTop: 25, height: 40, width: 50, borderWidth: 0, backgroundColor: 'transparent', flex: 0, alignItems: 'flex-start', position: 'absolute', top: 0, right: 0}]}>
          <Image source={icons[right]} />
        </TouchableOpacity>
      </View>
    );
  }
}
