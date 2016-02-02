'use strict';

import React, {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  TextInput,
  Image,
  SliderIOS,
  ScrollView,
  TouchableOpacity
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
      value: this.props.delay
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

    const contactList = user.emergencyContacts.map((contact, index) => {
      return (<EmergencyContactListItem
          key={index}
          contact={contact}
          actions={{removeEmergencyContact}}
          />);
    });

    return (
      <View style={styles.container}>
        <View style={{position: 'relative', flex: 0, top: 60, width: Math.floor(width * 0.9)}}>
          <Text style={[styles.subHeading, {marginLeft: 0, marginTop: 80, marginBottom: 5}]}>Emergency Contacts:</Text>

          <ScrollView contentContainStyle={[styles.container, { paddingVertical: 60}, {flex: 1, top: 100, height: 200, width: width}]}>
            {contactList}
          </ScrollView>

          <AddEmergencyContactForm
            user={user}
            emergencyContacts={user.emergencyContacts}
            actions={{addEmergencyContact}}
            />
        </View>

        <DelaySlider
          delay={user.acceptableDelay}
          user={user}
          actions={{setPassedTimeDelay}}
          />
        <NavBar
          navigator={navigator}
          description='Settings'
          right={{image: 'gear', action: () => navigator.pop()}}
          left={{image: 'leftArrow', action: () => navigator.pop()}}
          />

        <Text>{JSON.stringify(user)/*used for debugging*/}</Text>

      </View>
    );
  }
}
