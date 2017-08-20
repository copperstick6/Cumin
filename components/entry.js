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
import {Volunteer} from './volunteer'

import {Default} from './Default'


export class Entry extends Component {
  static navigationOptions =({navigation}) => ({
    title: 'Welcome',
    headerRight: <Button title="Settings" onPress ={() => navigation.navigate('Settings')}/>
  });
  constructor(props){
    super(props)
    this.state = {
      isNew: false,
    }
    this.setNew = this.setNew.bind(this)
  }
  componentWillMount(){
    //Functionality for the "Getting Started" Page and allowing users to set their API endpoints
    AsyncStorage.getItem("volunteer").then(function(value){
      console.log(value)
      if(value === null){
        this.setState({isNew: true})
        AsyncStorage.setItem("isNew": true)
      }
      else{
        this.setState({isNew: false})
      }
    }.bind(this))
  }
  setNew(){
    this.setState({isNew: false})
  }



  render() {
    let screen = null
    if(this.state.isNew){
      screen = <Volunteer setNew = {this.setNew} />
    }
    else{
      screen = <Default navigation = {this.props.navigation}/>
    }
    const { navigate } = this.props.navigation;
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
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginRight: 10,
  },
  welcome: {
    fontSize: 25,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
