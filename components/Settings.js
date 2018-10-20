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

export class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
    mode: 'modal'
  };
  constructor(props){
    super(props)
    this.state = {
      text: '',
      supported: true,
      enabled: false,
    }
    this.saveEmail = this.saveEmail.bind(this)
  }


  saveEmail(){
    AsyncStorage.setItem("volunteer", this.state.text)
    Toast.show("Email successfully edited.")
    this.props.navigation.dispatch(NavigationActions.back())
  }
  componentWillMount(){
      NfcManager.isSupported()
          .then(supported => {
              this.setState({ supported });
          })
      NfcManager.isEnabled()
          .then(enabled => {
              this.setState({ enabled });
          })
          .catch(err => {
              console.log(err);
          })
    AsyncStorage.getItem("volunteer").then(function(value){
      console.log(value)
      if(!(value === null)){
        this.setState({text: value})
      }
    }.bind(this))
  }
  _goToNfcSetting = () => {
      if (Platform.OS === 'android') {
          NfcManager.goToNfcSetting()
              .then(result => {
                  console.log('goToNfcSetting OK', result)
              })
              .catch(error => {
                  console.warn('goToNfcSetting fail', error)
              })
      }
  }

  render() {
     let { supported, enabled} = this.state;
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
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text style={styles.nfc}>{`Is NFC supported ? ${supported}`}</Text>
      <Text style={styles.nfc}>{`Is NFC enabled (Android only)? ${enabled}`}</Text>
      <Text>{"\n"}</Text>
      <Text style={styles.nfc}>Set NFC Setting here: (Go to Connection preferences -> NFC)</Text>
      <Button style={{ marginTop: 20 }} onPress={this._goToNfcSetting} title="Go to NFC setting">
      </Button>
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
    textAlign: 'center'
  },
  nfc: {
      fontSize: 25,
      margin: 10,
      textAlign: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
