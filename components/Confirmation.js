
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
	  error: false,
	  errorMsg : '',
	  visible: true,
	  userDetails: null,
	  curMsg : null,
	  eid: false,
	  userEid: null,
	  valid: false
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
	  console.log(API.API + "api/users/" + this.props.navigation.state.params.data.userId + "/checkin")
	  fetch(API.API + "api/users/" + this.props.navigation.state.params.data.userId + "/checkin", {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'x-access-token': API.temp_token,
			'Content-Type': 'application/json',
		  },
	  }).then(response => response.json()).then(responseJson => {
		  console.log("HI")
	  });
	  axios({
		  method:"POST",
		  url: API.API + "api/users/" + this.props.navigation.state.params.data.userId + "/checkin",
		  headers: {'x-access-token': API.temp_token}
	  }).then(function(response){ console.log(response)})

  }

  backPress() {
	this.props.navigation.state.params.resetState()
  }
  rescan(){
	  this.props.navigation.state.params.resetState()
	  this.props.navigation.dispatch(NavigationActions.back())
  }
  sendCode(){

  }

  render(){
	var btn = null;
	var msg = null;
	var chkbtn = null;
	var eidInput = null;
	if(!(this.state.visible)){
	  btn = <Button style = {styles.button} onPress={this.rescan} title="Go Back"></Button>
	  msg = <Text style = {styles.welcome}>{this.state.curMsg}</Text>
	}
	if(this.state.valid){
	  if(this.state.eid){
		  eidInput = <TextInput style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => this.setState({userEid: text})} value={this.state.userEid} />
	  }
	  chkbtn = <Button onPress={this.sendCode} title="Check In User"></Button>
	}
	return(
	  <View style={styles.container}>
	  <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} >
	  </Spinner>
	  {msg}
	  {btn}
	  <Text>{"\n"}</Text>
	  {eidInput}
	  <Text>{"\n"}</Text>
	  {chkbtn}
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
