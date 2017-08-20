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
  Image,
  TextInput
} from 'react-native';
import Toast from 'react-native-simple-toast'
import {NavigationActions} from 'react-navigation'

export class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
    mode: 'modal'
  };
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
    this.saveEmail = this.saveEmail.bind(this)
  }

  saveEmail(){
    AsyncStorage.setItem("volunteer", this.state.text)
    Toast.show("Email successfully edited.")
    this.props.navigation.dispatch(NavigationActions.back())
  }
  componentWillMount(){
    AsyncStorage.getItem("volunteer").then(function(value){
      console.log(value)
      if(!(value === null)){
        this.setState({text: value})
      }
    }.bind(this))
  }

  render() {
    return (
      <View style = {styles.container}>
      <Text style={styles.welcome}>
      Volunteer Email
      </Text>
      <TextInput
        style={{height: 40, width:300}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button onPress={this.saveEmail} title="Next"></Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    marginTop: 50,
    fontSize: 25,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
