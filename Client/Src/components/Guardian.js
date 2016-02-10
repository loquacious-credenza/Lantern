'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
} from 'react-native';
import NavBar from './nav-bar';

var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  RTCSetting,
} = WebRTC;

window.navigator.userAgent = "react-native";
const io = require('socket.io-client/socket.io');



// importing styles
import { baseStyles } from '../styles-base';
const styles = StyleSheet.create(require('../styles.js'));
const localStyles = StyleSheet.create({
  guardianContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightGray'
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: '#833',
    alignSelf: 'center',
    top: 200,
    borderWidth: 1,
    borderColor: '#222'
  },
  square: {
    width: 75,
    height: 75,
    borderRadius: 3,
    backgroundColor: '#000',
    alignSelf: 'center',
    top: 62.5
  }
});

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

var pcPeers = {};
var localStream;
var container;
var socket;

function getLocalStream(isFront, callback) {
  console.log('getLocalStream');
  navigator.getUserMedia({
    "audio": true,
    "video": true,
    "videoType": (isFront ? "front" : "back") // optional, values is `back`, `front`
  }, function (stream) {
    callback(stream);
  }, logError);
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (var i in socketIds) {
      var socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  var pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    container.setState({info: 'Someone is watching!'});
    peerConnected();

    var remoteList = container.state.remoteList;
    remoteList[socketId] = event.stream.toURL();
    container.setState({ remoteList: remoteList });
  };
  pc.addStream(localStream);
  return pc;
}

function exchange(data) {
  var fromId = data.from;
  var pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  var pc = pcPeers[socketId];
  var viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  var remoteList = container.state.remoteList;
  delete remoteList[socketId]
  container.setState({ remoteList: remoteList });
  container.setState({info: 'One peer leave!'});
}



function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  var array = [];
  for (var key in hash) {
    var obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function peerConnected() {
  RTCSetting.setAudioOutput('speaker');
  RTCSetting.setKeepScreenOn(true);
  RTCSetting.setProximityScreenOff(true);
}

function turnOn() {
  socket = io.connect('https://lantern-app-test.herokuapp.com');

  socket.on('exchange', function(data){
    console.log('exchange');
    exchange(data);
  });

  socket.on('leave', function(socketId){
      console.log('leave');
    leave(socketId);
  });

  socket.on('connect', function(data) {
    console.log('connect');
    getLocalStream(true, function(stream) {
      localStream = stream;
      container.setState({selfViewSrc: stream.toURL()});
      container.setState({status: 'ready', info: 'Please enter or create room ID'});
    });
  });
}


export default class Guardian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Initializing',
      status: 'init',
      roomID: 'test',
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      webrtc: false,
    };
  }
  testingStuff = () => {
    // invoke action that sets redux webrtc  to true
    // this action creates a link and sends it to server
    //
    this.setState({webrtc: true});
  };
  componentDidMount() {
    container = this;
    turnOn();
    console.log('ID', this.props.state)
    join(this.props.state.user.id);
  }

  _press = (event) => {
    this.refs.roomID.blur();
    this.setState({status: 'connect', info: 'Connecting'});
    join(this.state.roomID);
  };

  _switchVideoType = () => {
    var isFront = !this.state.isFront;
    this.setState({isFront});
    getLocalStream(isFront, function(stream) {
      if (localStream) {
        for (var id in pcPeers) {
          var pc = pcPeers[id];
          pc && pc.removeStream(localStream);
        }
        localStream.release();
      }
      localStream = stream;
      container.setState({selfViewSrc: stream.toURL()});

      for (var id in pcPeers) {
        var pc = pcPeers[id];
        pc && pc.addStream(localStream);
      }
    });
  };

  render() {
    const { state, actions, navigator } = this.props;
    const { currentLocation } = state; //destructure the parts of state that you need
    const { getCurrentLocation } = actions; // destructure the actions the components uses to update state.

    console.log( 'IN THE PROPS', navigator.props.state.user);

    const webrtc = this.state.webrtc ?
       (<View>
        <RTCView streamURL={this.state.selfViewSrc} style={baseStyles.absoluteCenter}/>
        <View style={baseStyles.container}>
          <View>
            <TouchableHighlight
              style={style.switchCamera}
              onPress={this._switchVideoType}>
              <Text>Switch camera</Text>
            </TouchableHighlight>
          <Text style={style.welcome}>
            {this.state.info}
          </Text>
        </View>
        </View>


      </View>) : null;

    const streamToggle = !this.state.webrtc ?
      (<View style={localStyles.guardianContainer}>
          <NavBar
            navigator={navigator}
            description='Guardian'
          />
          <TouchableOpacity onPress={this.testingStuff}>
            <View style={localStyles.circle}>
            </View>
          </TouchableOpacity>
        </View>) : null;

    return (
      <View style={baseStyles.navContainer}>
      {webrtc}
      {streamToggle}
      </View>
    );
  }
}

var style = StyleSheet.create({
  selfView: {
    position: 'relative',
    width: baseStyles.FULL_WIDTH,
    height: baseStyles.FULL_HEIGHT,
  },
  remoteView: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'white',
  },
  switchCamera: {
    marginTop: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
  },
});
