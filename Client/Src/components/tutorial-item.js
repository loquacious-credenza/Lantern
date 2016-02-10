'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

var tutorialContent = {
  0: {
    title: 'Welcome to Lantern',
    body: "Lantern is a safety app. Our goal is to help you notify your loved ones quickly" 
          + " if you don't make it to your destination within a reasonable amount of time."
          + " Before we can get started, we need to go over some housekeeping items."
  },
  1: {
    title: 'Lantern is not a substitution for 911',
    body: "If you feel unsafe, you need to call 911, which is the fastest and most reliable way for you to get help." 
          + " Lantern is not a substitution for 911 in an emergency. "
  },

  2: {
    title: 'ETA + Acceptable Delay',
    body: "When you're on your way to a destination, tell us how long you think it will take. That is your ETA."
          + " In addition, we use a number of minutes called 'Acceptable Delay' to calibrate how much later you can be to your destination" 
          + " than what you expected before your emergency contacts will be notified that you did not check in. You can change your acceptable "
          + " delay in settings. Please keep in mind that once your ETA and Acceptable Delay have passed, we will email your emergency contacts."
  },
  3: {
    title: 'Emergency Contacts',
    body: "Give us the name and number of up to five emergency contacts. If you do not make it to your destination before your ETA and Acceptable Delay" 
          + " have passed, we will notify your emergency contacts via email and phone. They will receive a link to a website which will display details" 
          + " about your journey, including a map with your route. It is best to choose people you trust and with whom you do not mind sharing your route information." 
          + " Also, you should let them know that you are participating in Lantern and have put them down as your emergency contacts."
  }
}
// importing styles
const styles = StyleSheet.create(require('../styles.js'));

var TutorialItem = React.createClass({
  render: function() {
    var {page} = this.props
    return (
      <View>
      <Text>{tutorialContent[page].title}</Text>
      <Text>
        {tutorialContent[page].body}
      </Text>
      </View>
    );
  }

});

module.exports = TutorialItem;

