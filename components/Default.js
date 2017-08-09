import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Linking,
  Button,
  AsyncStorage,
  Image
} from 'react-native';


export class Default extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props){
    super(props)
    this.navigateQR = this.navigateQR.bind(this)
    this.navigateManual = this.navigateManual.bind(this)
  }
  navigateQR(){
    const {navigate} = this.props.navigation
    navigate("QrCamera")
  }
  navigateManual(){
    const {navigate} = this.props.navigation
    navigate("QrCamera")
  }


  render() {
    return (
      <View style = {styles.container}>
      <Image source={require('../electron.png')} style = {styles.image} />
      <Text style={styles.welcome}>
      Hi, Welcome to Electron
      </Text>
      <Text style = {styles.instructions}>
      To Get Started with the camera, press the button below.
      </Text>
      <Button onPress={this.navigateQR} title="Camera">Navigate</Button>
      <Text style = {styles.welcome}>
      {"\n"}
      Or
      </Text>
      <Text style={styles.instructions}>
      To manually input emails, press the button below.
      </Text>
      <Button onPress={this.navigateManual} title="Manual Input" ></Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  image: {
    height: '20%',
    width: '75%',
    resizeMode: "contain"
  },
  container: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
