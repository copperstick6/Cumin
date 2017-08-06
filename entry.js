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

import Example from './Example'
import QRCodeScanner from 'react-native-qrcode-scanner';



export class Entry extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(){
    super()
    this.state = {
      platform : "android"
    }
  }
  componentDidMount(){
    if(Platform.OS === 'ios'){
      this.setState({platform: "ios"})
    }
  }
  render() {
    const nextRoute = {
      component: Example,
      title: 'Camera'
    };
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
      <Text style={styles.welcome}>
      Hi, Welcome to Electron
      </Text>
      <Text style = {styles.instructions}>
      To Get Started with the camera, press the button below.
      </Text>
      <Button onPress={() => navigate("Example")} title="Camera">Navigate</Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
