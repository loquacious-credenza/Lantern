'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;


var MapsAutoComplete = React.createClass({
  render: function() {
    return (
      <View style={styles.autocomplete}>
        <Text>
          Autocomplete Text Here
        </Text>
        <Text>
          Autocomplete Text Here
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  autocomplete: {
    backgroundColor:'white',
    flexDirection:'column'

  }
})


module.exports = MapsAutoComplete;