'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Dimensions,
  SliderIOS,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

// importing styles
const styles = StyleSheet.create(require('../styles.js'));

export default class DelaySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.delay
    };
  }

  componentDidMount(){
    setTimeout(() => this.setState({value: this.props.delay}), 50);
  }

  render() {
    const { delay, user, actions, style } = this.props;
    const { setPassedTimeDelay } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={[{flex: 0, width: width, height: 75, flexDirection: 'column', justifyContent: 'space-around'}, style]}>
        <Text style={[styles.subHeading, {marginTop: 0}]}>
          {`Trip Delay: `}
          <Text style={[styles.subHeading, {paddingLeft: 15}]}>
            {this.state.value === 1 ?
              `${this.state.value} min` :
              `${this.state.value} mins` }
          </Text>
        </Text>
        <SliderIOS
          disabled={false}
          value={user.acceptableDelay || this.state.value}
          onValueChange={(value) => this.setState({value: value})}
          onSlidingComplete={() => setPassedTimeDelay({
            delay: this.state.value,
            id: user.id
          })}
          minimumValue={5}
          maximumValue={60}
          step={1}
          style={{
            width: Math.floor(width * .9),
            height: 30,
            position: 'relative',
          }}
        />
      </View>
    );
  }
}



