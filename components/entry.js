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

import {Default} from './Default'


export class Entry extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(){
    super()
    this.state = {
      isNew: true
    }
    this.navigate = this.navigate.bind(this)
  }
  componentDidMount(){
    AsyncStorage.getItem("isNew").then(function(value){
      if(value === null){
        console.log("isNull")
      }
      else{
        this.setState({isNew: false})
      }
    })
  }
  navigate(input){
    console.log("Entered")
    this.props.navigation(input)
  }

  render() {
    const screen = <Default navigation = {this.props.navigation}/>
    return (
      <View style = {styles.container}>
      <Image source={require('../electron.png')} style = {styles.image} />

      {screen}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  image: {
    height: '40%',
    width: '75%',
    resizeMode: "contain"
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
