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
import NfcManager, {Ndef} from 'react-native-nfc-manager';



function buildTextPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.textRecord(valueToWrite),
    ]);
}


export class nfc extends Component {
  static navigationOptions = {
    title: 'NFC',
  };
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
	componentWillMount(){

	}

  render() {
    return (
      <View style = {styles.container}>
      <Text style={styles.welcome}>
      {this.props.navigation.state.params.email}
      </Text>
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
