'use strict';

import React, {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  TextInput,
  SliderIOS,
  TouchableOpacity
} from 'react-native';

import { map } from 'lodash'

const { width, height } = Dimensions.get('window');

// importing styles
//const styles = StyleSheet.create(require('../styles.js'));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightBlue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameInput: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    width: width - 20,
    alignSelf: 'center'
  },
  saveButton: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 125,
    marginTop: 25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'teal'
  },
  heading: {
    position: 'absolute',
    alignSelf: 'center',
    top: 15,
    fontSize: 40
  },
  subHeading: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: width - (width - 10),
    top: 0,
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontSize: 20,
    color: 'white'
  },
  slider: {
    width: Math.floor(width * .9),
    height: 30,
    position: 'relative',
  }

});

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      value: this.props.state.user.acceptableDelay
    }
  }

  getAndReset(prop, val){
    let saved = this.state[prop];
    this.setState({ [prop]: val});
    return saved;
  }

  render() {
    const { state, actions, navigator } = this.props;
    const { user } = state; //destructure the parts of state that you need
    const {
      addEmergencyContact,
      updateEmergencyContact,
      setPassedTimeDelay
     } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>

        <Text style={styles.subHeading}>Emergency Contacts:</Text>
      {/*This will need to become a component that can be mapped*/}
        <TextInput
          style={styles.nameInput}
          placeholder='Contact Name'
          ref='contactName'
          onChangeText={(name) => {this.setState({name})}}
          value={this.state.name}
          />
        <TextInput
          style={styles.nameInput}
          placeholder='(xxx) xxx-xxxx'
          ref='contactPhone'
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />
        <TextInput
          style={styles.nameInput}
          placeholder='fake@email.com'
          ref='contactEmail'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
      {/*End of component*/}
        <TouchableOpacity
          onPress={() => addEmergencyContact({
            id: user.id,
            existingContacts: user.emergencyContacts,
            name: this.getAndReset('name', ''),
            phone: this.getAndReset('phone', ''),
            email: this.getAndReset('email', '')
          })}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Add</Text>
        </TouchableOpacity>

        <View style={[styles.container, {width: width, flexDirection: 'column', justifyContent: 'space-around'}]}>
        <Text style={[styles.subHeading, {color: 'blue'}]}>
          {`Trip Delay: `}
          <Text style={[styles.subHeading, {paddingLeft: 15}]}>{this.state.value === 1 ? `${this.state.value} min` : `${this.state.value} mins` }</Text>
          </Text>
        <SliderIOS
          disabled={false}
          value={this.state.value}
          onValueChange={(value) => this.setState({value: value})}
          onSlidingComplete={() => setPassedTimeDelay({
            delay: this.state.value,
            id: user.id
          })}
          minimumValue={5}
          maximumValue={60}
          step={1}
          style={styles.slider}
        />
        </View>

        <Text>{JSON.stringify(user)/*used for debugging*/}</Text>

      </View>
    );
  }
}
