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

// importing styles
import { baseStyles } from '../styles-base';
import styles  from '../styles';

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
      <View style={[baseStyles.colCenterContainer]}>
        <View>
          <TextInput
            style={styles.emergencyInput}
            placeholder='Contact Name'
            ref='contactName'
            onChangeText={(name) => {this.setState({name})}}
            value={this.state.name}
            />
          <TextInput
            style={styles.emergencyInput}
            placeholder='(xxx) xxx-xxxx'
            ref='contactPhone'
            onChangeText={(phone) => this.setState({phone})}
            value={this.state.phone}
          />
          <TextInput
            style={styles.emergencyInput}
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
            style={[styles.button]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

