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

export default class EmergencyContactListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //style={styles.userContactDeleteButton}
    const { key, contact, user_id, id, actions, contactList } = this.props;
    const { contact_name, contact_phone, contact_email } = contact; //destructure the parts of state that you need
    const { removeEmergencyContact } = actions; // destructure the actions the components uses to update state.
    return (
      <View style={[styles.userContacts, this.props.style]} >
        <TouchableOpacity
          style={styles.userContactDeleteButton}
          onPress={() => removeEmergencyContact({
            user_id: user_id,
            id: id
          })}
        >
          <Image source={require('../assets/circle-x-7.png')}/>
        </TouchableOpacity>
        <Text style={styles.userContactsText}>{`Name: ${contact_name}`}</Text>
        <Text style={styles.userContactsText}>{`Phone: ${contact_phone}`}</Text>
        <Text style={styles.userContactsText}>{`Email: ${contact_email}`}</Text>
      </View>
    );
  }
}
