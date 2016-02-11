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
   
    var manipulatePhone = function(string){
      var output = string;
      if(string.length > 0 && string.charAt(0) !== '('){
        output = '(' + string;
      }
      if(string.length > 4 && string.charAt(4) !== ')'){
        output = output.slice(0,4) + ')' + output.slice(4);
      }
      if(string.length > 5 && string.charAt(5) !== ' '){
        output = output.slice(0,5) + ' ' + output.slice(5);
      }
      if(string.length > 9 && string.charAt(9) !== '-'){
        output = output.slice(0,9) + '-' + output.slice(9)
      }
      return output;
    }

    return (
      <View style={[baseStyles.colCenterContainer, this.props.style]}>
        <View>
          <TextInput
            style={styles.emergencyInput}
            placeholder='Contact Name'
            ref='contactName'
            onChangeText={(name) => {this.setState({name})}}
            value={this.state.name}
            autoCapitalize={'words'}
            />
          <TextInput
            style={styles.emergencyInput}
            placeholder='(xxx) xxx-xxxx'
            ref='contactPhone'
            onChangeText={(phone) => this.setState({phone})}
            value={manipulatePhone(this.state.phone)}
            keyboardType={'phone-pad'}
          />
          <TextInput
            style={styles.emergencyInput}
            placeholder='name@email.com'
            ref='contactEmail'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
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

