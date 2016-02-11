'use strict';

var moment = require('moment');

var React = require('react-native');
var {
  AsyncStorage,
  StyleSheet,
  View
} = React;

// FACEBOOK REACT NATIVE WRAPPER FOR SDK
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
  FBSDKAccessToken,
} = FBSDKCore;

var geolocation = require('../helpers/geolocation');

var Login = React.createClass({

  componentDidMount: function() {
    // AsyncStorage.clear();
    var {loadActiveTrip} = this.props.actions;
    AsyncStorage.multiGet(['userName','userID', 'onTrip', 'activeTrip', 'password']).then((response) => {
      // THIS IS WHERE WE CHECK TO SEE IF THE USER ON THIS DEVICE HAS PREVIOUSLY LOGGED IN
        if(response[0][1] !== null){
          // IF WE HAVE DATA, THERE IS NO NEED TO MAKE FACEBOOK GRAPH CALL
          // PARSING OUT VALUES FROM ASYNC STORAGE
          const name = response[0][1];
          const id = response[1][1];
          const onTrip = response[2][1];
          const activeTrip = JSON.parse(response[3][1]);
          const password = JSON.parse(response[4][1]);
          // console.log(name, id, onTrip, activeTrip)

          // CONSTRUCTING VARIABLES FOR TESTING WHETHER TRIPS ARE ACTIVE
          const overdueTime = (activeTrip && activeTrip.overdueTime) || (moment().valueOf());
          const timeDifference = moment
            .duration(moment(overdueTime) - moment().valueOf())
            .as('seconds');
          const isValid = timeDifference > 0;

          if (isValid && activeTrip){
          // IF THERE IS AN ACTIVE TRIP THAT IS NOT EXPIRED
            // CALL LOAD ACTION TRIP (ACTION CREATOR) WITH ACTIVE TRIP FROM ASYNC STORAGE
            loadActiveTrip(activeTrip);
          } else {
          // IF THERE IS AN ACTIVE TRIP THAT IS EXPIRED
            // CALL CLEAR TRIP (ACTION CREATOR) WITH PAYLOAD FOR CLEARING TRIPS
            this.props.actions.clearOnTrip({
              onTrip: false,
              activeTrip: null
            });
          }
            // set activeTrip in AsyncStorage to null
            // set onTrip in AsyncStorage to false
            // set onTrip in redux state to false
            // navigate to `startLocation` for new trip

          this.props.actions.login({
            name,
            id,
            onTrip,
            password

          });

          geolocation.getCurrentPosition(this, ()=>{
            this.props.navigator.replace({name: 'home' })
          });
          // this.props.navigator.replace({name: 'startLocation'});
        } else {
          // IF WE DON'T HAVE DATA, NEED TO PROCEED WITH LOGGING IN VIA FACEBOOK

        }
    }).done(() => {
      // TBD
    });
  },

  loggedIn: function() {
    //all of these vars are here to get this to bind correctly
    var name;
    var id;

    new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('Error making request.');

        // THIS IS AN ERROR MAKING THE FB GRAPH REQUEST TO GET NAME
      } else {
        name = result.name;
        id = result.id;
        //setting AsyncStorage with userID and userName.
        AsyncStorage.multiSet([['userID',id],['userName',name]]).then(() => {
          //pushing new navigation view
          this.props.actions.login({name:name,id:id});
          geolocation.getCurrentPosition(this, ()=>{
            this.props.navigator.replace({name:'tutorial'})
          });

        // this.push(name,id);
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

var styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 50,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 10
  },
});

module.exports = Login;
