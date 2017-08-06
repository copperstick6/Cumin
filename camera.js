import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Camera from 'react-native-camera';


export class QrCamera extends Component{
  render() {
     return (
       <View style={styles.container}>
       <Camera
         >
       </Camera>
       </View>
     );
   }

   takePicture() {
     const options = {};
     //options.location = ...
     this.camera.capture({metadata: options})
       .then((data) => console.log(data))
       .catch(err => console.error(err));
   }
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
