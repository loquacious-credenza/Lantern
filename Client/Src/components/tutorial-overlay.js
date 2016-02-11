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


import {each} from 'lodash';
const { width, height } = Dimensions.get('window');
// importing styles
const styles = StyleSheet.create(require('../styles.js'));
import { baseStyles } from '../styles-base';
import NavBar from './nav-bar';
import TutorialItem from './tutorial-item';
import tutorialContent from '../constants/tutorial-content';
import Button from '../Common/Button';


var Carousel = require('react-native-carousel');


var TutorialOverlay = React.createClass({
  getInitialState: function(){
   return {
      page: 0
    }
  },
  render: function() {
    const { navigator } = this.props;
    return (
     <View style={[baseStyles.navContainer,{backgroundColor:'white'}]}>
        <NavBar
          navigator={navigator}
          description={this.state.description}
          left={{
            image: 'leftArrow',
            action: () => navigator.pop()
          }}
          />
      


      <View >
       <Carousel width={width} animate={false} indicatorOffset={20}>
              <View style={[componentStyles.container]}>
              <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/logo.png')}></Image>
              </View>
                <View style={[componentStyles.textContainer]}>
                  <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['0'].title}</Text>
                  <Text style={[componentStyles.text]}>{tutorialContent['0'].body}</Text>
                </View>
              </View>

              <View style={componentStyles.container}>
              <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/exclamation.png')}></Image>
              </View>
              <View style={[componentStyles.textContainer]}>
                <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['1'].title}</Text>
                <Text style={[componentStyles.text]}>{tutorialContent['1'].body}</Text>
              </View>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/destination.png')}></Image>
                </View>
                <View style={[componentStyles.textContainer]}>
                  <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['2'].title}</Text>
                  <Text style={[componentStyles.text]}>{tutorialContent['2'].body}</Text>
                </View>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/delay.png')}></Image>
                </View>
                <View style={[componentStyles.textContainer]}>
                  <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['3'].title}</Text>
                  <Text style={[componentStyles.text]}>{tutorialContent['3'].body}</Text>
              </View>
              </View>

              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/emergency.png')}></Image>
                </View>
                <View style={[componentStyles.textContainer]}>
                  <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['4'].title}</Text>
                  <Text style={componentStyles.text}>{tutorialContent['4'].body}</Text>
                </View>
              </View>
              <View style={componentStyles.container}>
               <View style={{marginBottom:10}}>
                <Image style={componentStyles.image} source={require('../assets/emergency.png')}></Image>
                </View>
                <View style={[componentStyles.textContainer]}>
                  <Text style={[styles.subHeading, componentStyles.header]}>{tutorialContent['5'].title}</Text>
                  <Text style={componentStyles.text}>{tutorialContent['5'].body}</Text>
                  <Button 
                  text={'Finish Tutorial'} 
                  onPress={() => this.props.navigator.push({name: 'home'})}>
                  </Button>
                </View>
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
    padding: 21
  },
  textContainer: {
    backgroundColor:'transparent',
    paddingTop:5,
    marginHorizontal:5,
    marginTop:15
  },
  header: {
    fontWeight: '200',
    fontFamily: baseStyles.FONT,
    fontSize:24, 
    alignSelf:'center',
    color: '#4489CB',
    marginBottom: 5,
  },
  text: {
    alignSelf:'center',
    fontSize: 14, 
    fontFamily: baseStyles.FONT,
    fontWeight:'100',
    color:'#1a1a1a'
  },
  image: {
    borderWidth: .8,
    borderColor: 'black'  }
});

module.exports = TutorialOverlay;


