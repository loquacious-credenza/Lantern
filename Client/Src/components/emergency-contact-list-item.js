'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// importing styles
const styles = StyleSheet.create(require('../styles.js'));

export default class EmergencyContactListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { contact, key, actions } = this.props;
    const { contact_name, contact_phone, contact_email } = contact; //destructure the parts of state that you need
    const { removeEmergencyContact } = actions; // destructure the actions the components uses to update state.

    return (
      <View key={key} style={{marginTop: 20}} >
        <Text>{`Name: ${contact_name}`}</Text>
        <Text>{`Phone ${contact_phone}`}</Text>
        <Text>{`Email ${contact_email}`}</Text>
      </View>
    );
  }
}
