var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Login = require('./Facebook/Login');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Main = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>We dont need no stinking image background yet!!</Text>
          </View>
          {/*this is the log in button*/}
          <Login style={styles.loginContainer}/>
      </View>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('./styles.js'));

module.exports = Main;
