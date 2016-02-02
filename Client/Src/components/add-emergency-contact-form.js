'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

// importing styles
// const styles = StyleSheet.create(require('../styles.js'));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  },
  nameInput: {
    padding: 4,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 2,
    width: Math.floor(width * 0.9),
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

import getAndReset from './mixins/getAndReset';

export default class AddEmergencyContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: ''
    };
  }

  render() {
    const { user, emergencyContacts, actions } = this.props;
    const { addEmergencyContact } = actions; // destructure the actions the components uses to update state.

    return (
      <View style={[styles.container, {height: 200}]}>
        <View>
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
        </View>
      {/*End of component*/}
          <TouchableOpacity
            onPress={() => addEmergencyContact({
              id: user.id,
              existingContacts: emergencyContacts,
              name: getAndReset.call(this,'name', ''),
              phone: getAndReset.call(this,'phone', ''),
              email: getAndReset.call(this,'email', '')
            })}
            style={[styles.saveButton, {right: 0}]}>
            <Text style={styles.saveButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

