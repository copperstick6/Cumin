
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Platform,
  BackAndroid,
  BackHandler,
  AsyncStorage,
  TextInput
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import API from '../config/api.json'
var axios = require('axios')
export class Confirmation extends React.Component {
  constructor(props){
	super(props)
	this.state = {
	  visible: true,
	  valid: false,
	  msg: ""
	}
	this.backPress = this.backPress.bind(this)
	this.rescan = this.rescan.bind(this)
	this.sendCode = this.sendCode.bind(this)
  }
  static navigationOptions = {
	title: 'Confirmation',
	headerLeft: null,
  };
  componentDidMount(){
	if(!(Platform.OS === 'ios')){
		BackHandler.addEventListener('hardwareBackPress', this.backPress);
	}
  }
  componentWillUnmount() {
	if(!(Platform.OS === 'ios')){
		BackHandler.removeEventListener('hardwareBackPress', this.backPress);
	}
  }
  componentWillMount(){
	  console.log(this.props.navigation.state.params.data)
	  this.setState({visible: true, valid: false})
	  console.log(API.API + "api/users/" + this.props.navigation.state.params.data.userId + "/checkin")
	  fetch(API.API + "api/users/" + this.props.navigation.state.params.data.userId + "/checkin", {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'x-access-token': API.temp_token,
			'Content-Type': 'application/json',
		  },
	  }).then(response => response.json()).then(responseJson => {
		  console.log(responseJson)
		  if(responseJson["status"]["admitted"] == false){
			  this.setState({msg: "User is not admitted" })
		  }
		  else if(responseJson["status"]["confirmed"] == false){
			  this.setState({msg: "User is not confirmed." })
		  }
		  else if (responseJson["status"]["declined"] == true){
			  this.setState({msg: "User declined invitation." })
		  }
		  else{
			  let new_msg = ""
			  if (responseJson["profile"]["adult"] == false){
				  mew_msg += "User is not an adult. Check ID to make sure.\n"
			  }
			  new_msg += "Name: " + responseJson["profile"]["name"] + "\n"
			  new_msg += "School: " + responseJson["profile"]["school"] + "\n"
			  new_msg += "EID: " + responseJson["profile"]["eid"] + "\n"
			  new_msg += "Grad Year: " + responseJson["profile"]["graduationYear"] + "\n"
			  new_msg += "Gender: " + responseJson["profile"]["gender"] + "\n"
			  this.setState({msg: new_msg, valid: true})
		  }
		  this.setState({visible: false})
	  });
  }

  backPress() {
	this.props.navigation.state.params.resetState()
  }
  rescan(){
	  this.props.navigation.state.params.resetState()
	  this.props.navigation.dispatch(NavigationActions.back())
  }
  sendCode(){
	  Toast.show("User checked in!")
	  this.props.navigation.state.params.resetState()
	  this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
	var btn = null;
	var chkbtn = null;
	var msg = null
	if(!(this.state.visible)){
	  msg = <Text style = {styles.welcome}>{this.state.msg}</Text>
	  btn = <Button style = {styles.button} onPress={this.rescan} title="Go Back"></Button>
	}
	if(this.state.valid){
	  chkbtn = <Button onPress={this.sendCode} title="Check In User"></Button>
	}
	return(
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} >
	  </Spinner>
	  {msg}
	  {chkbtn}
	  <Text>{"\n"}</Text>
	  {btn}
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
  button: {
	margin: 20,
	marginBottom: 5
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
