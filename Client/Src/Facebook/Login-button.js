'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
} = React;
/*facebook react native wrapper for SDK*/
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
} = FBSDKCore;

var Login = React.createClass({
  componentDidMount: function() {
    FBSDKAccessToken.getCurrentAccessToken((result) => {
      if (result) {
        this.props.navigator.push({name: 'home'});
      }
    })
  },

  render: function() {
    return (
      <View style={this.props.style}>
        <FBSDKLoginButton
          style={styles.loginButton}
          onWillLogin={() => {
          /*method to check to see if login is needed*/
            FBSDKAccessToken.getCurrentAccessToken((result) => {
              console.log('first', result);
              if (result == null) {
                alert('Start logging in.');
              } else {
                alert('Start logging out.');
              }
            });
            return true;
          }}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                this.props.navigator.push({ name: 'home'})
              }
            }
          {/*calling function again to get acess token after log in*/}
          FBSDKAccessToken.getCurrentAccessToken((data) => {
              console.log('data',data);
            });
          }
        }

          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={[]}/>
      </View>
    );
  }
});

//importing styles

var styles = StyleSheet.create(require('../styles.js'));

module.exports = Login;
