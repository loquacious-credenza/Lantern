'use strict';

var React = require('react-native');
var {
  AsyncStorage,
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
  FBSDKGraphRequest,
  FBSDKAccessToken,
} = FBSDKCore;

var Login = React.createClass({

  componentDidMount: function() {
    AsyncStorage.getItem('userID').then((ID)=>{
      console.log('COMPENENTDIDMOUNTANDSTUFF',ID)
      if(ID !== null){
        this.loggedIn();
      }else{
        alert('error has access token but not set in async state');
      }
    })
  },
  loggedIn: function() {
    //all of this vars are here to get this to bind correct
    var name;
    var id;
    var push = () => this.props.navigator.push({name: 'home', userName: name, id: id});

    new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('Error making request.');
      } else {
        console.log('GRAPHINGGGGGGGG',result)
        name = result.name;
        id = result.id;
        //setting AsyncStorage with userID and userName.
        AsyncStorage.multiSet([['userID',id],['userName',name]]).then(() => {
          //pushing new navigation view
        push();
        })
        // Data from request is in result
      }
    }, '/me').start();
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
                this.loggedIn();
              }
            }
          }
        }

          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={['public_profile']}
          publishPermissions={[]}/>
      </View>
    );
  }
});

//importing styles

var styles = StyleSheet.create(require('../styles.js'));

module.exports = Login;
