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
    console.log("Props are:",this.props.actions)
    AsyncStorage.multiGet(['userName','userID']).then((response) => {
      // THIS IS WHERE WE CHECK TO SEE IF THE USER ON THIS DEVICE HAS PREVIOUSLY LOGGED IN
        if(response[0][1] !== null){
          // IF WE HAVE DATA, THERE IS NO NEED TO MAKE FACEBOOK GRAPH CALL
          this.props.actions.login({name:response[0][1],id:response[1][1]});
          console.log('RIGHT BEFORE PUSH');
          this.props.navigator.push({name: 'getLocation',userName: response[0][1], userID: response[1][1]});
        } else {
          // IF WE DON'T HAVE DATA, NEED TO PROCEED WITH LOGGING IN VIA FACEBOOK

        }
    }).done();
  },
  push: function(name, id) {
    // console.log('PUSHSHSHSHSSHSHSHS', this.props.navigator);
    this.props.navigator.push({name: 'home', userName: name, id: id});
  },
  loggedIn: function() {
    //all of these vars are here to get this to bind correctly
    var name;
    var id;
    // console.log('HEYYYYYYYYYYYYPROPS',this.props.navigator)

    new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('Error making request.');
        // THIS IS AN ERROR MAKING THE FB GRAPH REQUEST TO GET NAME
      } else {
        console.log('GRAPHINGGGGGGGG',result)
        name = result.name;
        id = result.id;
        //setting AsyncStorage with userID and userName.
        AsyncStorage.multiSet([['userID',id],['userName',name]]).then(() => {
          //pushing new navigation view
        this.push(name,id);
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
              // console.log('first', result);
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
