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

const { width, height } = Dimensions.get('window');

// importing styles
//const styles = StyleSheet.create(require('../styles.js'));
import getAndReset from './mixins/getAndReset';
//components
import ContactListView from './contact-list-view';
import EmergencyContactListItem from './emergency-contact-list-item';
import AddEmergencyContactForm from './add-emergency-contact-form';
import DelaySlider from './delay-slider';
import NavBar from './nav-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
        contentContainStyle={[styles.container, { paddingVertical: 60}, {flex: 1, top: 100, height: 200, width: width}]}>
        {map(user.emergencyContacts, (contact) => {
          return (<EmergencyContactListItem
              key={contact._id}
              id={contact._id}
              contact={contact}
              actions={{removeEmergencyContact}}
              />);
          })
        }
      </ScrollView> : null;

    const showInputForm = user.emergencyContacts.length < 5 ?
      <AddEmergencyContactForm
          user={user}
          emergencyContacts={user.emergencyContacts}
          actions={{addEmergencyContact}}
          /> : null;

    return (
      <View style={{flex: 1, backgroundColor: '#e6e6e6'}}>
        <NavBar
          navigator={navigator}
          description='Settings'
          right={{image: 'gear', action: () => navigator.pop()}}
          left={{image: 'leftArrow', action: () => navigator.pop()}}
          />
        <DelaySlider
          style={{marginTop: 20}}
          delay={user.acceptableDelay}
          user={user}
          actions={{setPassedTimeDelay}}
          />
        <View>
          <Text style={[{marginLeft: 0, marginBottom: 5}]}>Emergency Contacts:</Text>
            {showInputForm}
            {contactList}
        </View>
      </View>
    );
  }
}
