'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
// importing styles
const styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
import NavBar from './nav-bar';
import TutorialItem from './tutorial-item';
import tutorialContent from '../constants/tutorial-content'


var Carousel = require('react-native-carousel');

var TutorialOverlay = React.createClass({
  getInitialState: function(){
   return {
      page: 0
    }
  },
  render: function() {
    
    navigator = this.props.navigator
    return (
     <View style={[baseStyles.navContainer,baseStyles.bgGray1]}>
        <NavBar
          navigator={navigator}
          description={this.state.description}
          right={{
            image: 'gear',
            action: () => navigator.push({
              name: 'settings'
            })
          }}
          left={{
            image: 'shield',
            action: () => navigator.push({
              name: 'settings',
              sceneConfig: 'FloatFromLeft'
            })
          }}
          />
      


      <View >
       <Carousel width={width} animate={false} indicatorOffset={20}>
              <View style={componentStyles.container}>
              <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/logo.png')}></Image>
              </View>
                <Text style={[styles.subHeading,{fontSize:20},baseStyles.rgbaAccent0]}>{tutorialContent['0'].title}</Text>
                <Text>{tutorialContent['0'].body}</Text>
              </View>

              <View style={componentStyles.container}>
              <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/exclamation.png')}></Image>
              </View>
                <Text style={[styles.subHeading,{fontSize:20},baseStyles.rgbaAccent0]}>{tutorialContent['1'].title}</Text>
                <Text>{tutorialContent['1'].body}</Text>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/destination.png')}></Image>
                </View>
                <Text style={[styles.subHeading,{fontSize:20},baseStyles.rgbaAccent0]}>{tutorialContent['2'].title}</Text>
                <Text>{tutorialContent['2'].body}</Text>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/delay.png')}></Image>
                </View>
                <Text style={[styles.subHeading,{fontSize:20},baseStyles.rgbaAccent0]}>{tutorialContent['3'].title}</Text>
                <Text>{tutorialContent['3'].body}</Text>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/emergency.png')}></Image>
                </View>
                <Text style={[styles.subHeading,{fontSize:20},baseStyles.rgbaAccent0]}>{tutorialContent['4'].title}</Text>
                <Text>{tutorialContent['4'].body}</Text>
              </View>

      </Carousel>
      </View>
      </View>
    );
  }

});

var componentStyles = StyleSheet.create({
  container: {
    width: width,
    height: height*.8,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 15
  },
  text: {
    top: height/5
  },
  image: {
    borderWidth: 2,
    borderColor: 'black'  }



});

module.exports = TutorialOverlay;


