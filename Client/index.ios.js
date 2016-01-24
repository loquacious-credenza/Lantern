

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Login = require('./Login');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Lantern = React.createClass({
  render: function() {
    return (
      <Image
      //react native uses this new require tage to use images instead of uri now.
        source={require('./plutoBack.png')}
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
        //testing to see if text would show up
          <Text style={styles.disclaimerText}>Hey is this working</Text>
        </View>
        //importing the login facebook button.
        <Login style={styles.loginContainer}/>
      </Image>
    );
  }
});

// importing styles
var styles = StyleSheet.create(require('./styles.js'));

AppRegistry.registerComponent('Lantern', () => Lantern);
