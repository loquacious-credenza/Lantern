'use strict';

import React, {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  ScrollView
} from 'react-native';

import { map } from 'lodash'

// importing styles
import { baseStyles } from '../styles-base';
import styles from '../styles';
import getAndReset from './mixins/getAndReset';
//components
import EmergencyContactListItem from './emergency-contact-list-item';
import AddEmergencyContactForm from './add-emergency-contact-form';
import DelaySlider from './delay-slider';
import NavBar from './nav-bar';



export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'Settings',
      value: this.props.delay,
      contacts: this.props.state.user.emergencyContacts
    };
  }

  render() {
    const { state, actions, navigator } = this.props;
    const { user } = state; //destructure the parts of state that you need
    const {
      removeEmergencyContact,
      addEmergencyContact,
      updateEmergencyContact,
      setPassedTimeDelay
     } = actions; // destructure the actions the components uses to update state.
      const contactList = user.emergencyContacts.length > 0 ?
      <ScrollView
        contentContainStyle={[baseStyles.container]}>
        {map(user.emergencyContacts, (contact, index) => {

          return (<EmergencyContactListItem
              key={contact._id}
              id={contact._id}
              user_id={user.id}
              contact={contact}
              actions={{removeEmergencyContact}}
              style={[styles.contactListItem]}
              />);
          })
        }
      </ScrollView> : null;

    const showInputForm = user.emergencyContacts.length < 5 ?
      <AddEmergencyContactForm
          style={baseStyles.container}
          user={user}
          emergencyContacts={user.emergencyContacts}
          actions={{addEmergencyContact}}
          /> : null;

    return (
      <View style={[baseStyles.container, baseStyles.bgGray1]}>
        <NavBar
          navigator={navigator}
          description='Settings'
          right={{image: 'rightArrow', action: () => navigator.pop()}}
          />
        <DelaySlider
          style={baseStyles.container}
          delay={user.acceptableDelay}
          user={user}
          actions={{setPassedTimeDelay}}
          />
        <View>
          <Text style={[styles.subHeading]}>Emergency Contacts:</Text>
            {showInputForm}
            {contactList}
        </View>
      </View>
    );
  }
}
