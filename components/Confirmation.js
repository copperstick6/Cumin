
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
import NfcManager, {Ndef} from 'react-native-nfc-manager';


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
      if(!(String(API.API.Volunteer) === null) && this.props.navigation.state.params.email != ''){
        if(!(String(API.API.Secret) == "" || String(API.API.Pepper) == null)){
			console.log(String(API.API.Pepper) + "?email=" + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(API.API.Volunteer) + "&secret=" + String(API.API.Secret))
          fetch(String(API.API.Pepper) + "?email=" + String(this.props.navigation.state.params.email)  + "&secret=" + String(API.API.Secret) + '&volunteer_email=' + String(API.API.Volunteer))
          .then(response => response.json())
          .then(responseJson => {
			  console.log(responseJson)
  			if(responseJson['message'] == "User does not exist"){
  			    this.setState({curMsg: String(responseJson['message'])})
  	  		}
			else if(responseJson['checked_in'] == true){
               this.setState({curMsg: String(responseJson['name']) + " is checked in already."})
            }
           else if(responseJson['status'] == "CONFIRMED"){
			   if(responseJson['requires_eid'] == true){
				   this.setState({eid: true});
			   }
			   this.setState({valid: true})
			   this.setState({curMsg: "Attendee is Confirmed. Check them In!\nAttendee Details: \nName: " + String(responseJson['name']) + "\nAge: " + String(responseJson['age']) + "\nBirthday: " + responseJson['birthday'] + "\nEmail: " + String(responseJson['email']) + "\nSchool: " + String(responseJson['school'])   })
           }
		   else if(responseJson['status'] == "SIGNING"){
			   /*
			   if(responseJson['requires_eid'] == true){
				   this.setState({eid: true});
			   }
			   this.setState({valid: true})*/
			   this.setState({curMsg: "Attendee is Confirmed, but has not signed forms. Check them In after they sign their forms!\nAttendee Details: \nName: " + String(responseJson['name']) + "\nAge: " + String(responseJson['age']) + "\nBirthday: " + responseJson['birthday'] + "\nEmail: " + String(responseJson['email']) + "\nSchool: " + String(responseJson['school'])   })
           }
           else if(responseJson['status'] == "REJECTED"){
              this.setState({curMsg: String(responseJson['name']) + " rejected. Here is their data:\nAttendee Details: \nName: " + String(responseJson['name']) + "\nAge: " + String(responseJson['age']) + "\nBirthday: " + responseJson['birthday'] +"\nEmail: " + String(responseJson['email']) + "\nSchool: " + String(responseJson['school']) })
           }
           else{
			   this.setState({curMsg: String(responseJson['name']) + " is waitlisted. Here is their data:\nAttendee Details: \nName: " + String(responseJson['name']) + "\nStatus: " + responseJson['status'] + "\nAge: " + String(responseJson['age']) + "\nBirthday: " + responseJson['birthday'] + "\nEmail: " + String(responseJson['email']) + "\nSchool: " + String(responseJson['school']) })
             }
           this.setState({visible: false})
	   })
          .catch((error) => {
            console.log(error)
            this.setState({error: true, errorMsg: String(error), visible: false})
		})
        }
        else{
          fetch(String(API.API.Pepper) + '?email=' + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(API.API.Volunteer))
          .then(response => response.json())
          .then(responseJson => {
  			  if(responseJson['message'] == "User does not exist"){
  				    this.setState({curMsg: String(responseJson['message'])})
  			   }
           else if(responseJson['confirmed'] == false){
              this.setState({curMsg: String(responseJson['name']) + " is not confirmed! Tell attendee to go to desk."})
           }
           else if(responseJson['checked-in'] == true){
              this.setState({curMsg: String(responseJson['name']) + " is checked in already."})
           }
           else{
             this.setState({valid: true})
             this.setState({curMsg: "Attendee is Confirmed. Check them In!\nAttendee Details: \nName: " + String(responseJson['name']) + "\nAge: " + String(responseJson['age']) + "\nEmail: " + String(responseJson['email']) + "\nSchool: " + String(responseJson['school'])   })
           }
           this.setState({visible: false})
	   })
          .catch((error) => {
            console.log(error)
            this.setState({error: true, errorMsg: String(error), visible: false})
		})
        }
      }
      else{
        if(this.props.navigation.state.params.email == ''){
          this.setState({error: true, curMsg: "Please enter something into the email", visible: false})
        }
        else{
          this.setState({error: true, curMsg: "Unauthorized/Invalid Checkin link. Please contact an organizer", visible: false})
        }
      }
  }

  backPress() {
    this.props.navigation.state.params.resetState()
  }
  rescan(){
      this.props.navigation.state.params.resetState()
      this.props.navigation.dispatch(NavigationActions.back())
  }
  sendCode(){
	  if(this.state.eid){
		  fetch(String(API.API.Pepper), {
			method:"POST",
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({"email": String(this.props.navigation.state.params.email), "volunteer_email": + String(API.API.Volunteer), "secret": String(API.API.Secret), "eid": this.state.userEid}),
		  })
		  .then(response => response.json())
		  .then(responseJson => {
			console.log(String(JSON.stringify(responseJson)))
			if(responseJson['checked_in'] == true){
			  Toast.show("User successfully checked in")
      		  this.props.navigation.state.params.resetState()
              this.props.navigation.navigate("NFC" ,{email: String(this.props.navigation.state.params.email)})
			}
			else{
			  Toast.show("User check in failed.")
      		  this.props.navigation.state.params.resetState()
      		  this.props.navigation.dispatch(NavigationActions.back())
			}
	   })
	}
	else{
		  fetch(String(API.API.Pepper), {
			method:"POST",
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({"email": String(this.props.navigation.state.params.email), "volunteer_email": String(API.API.Volunteer), "secret": String(API.API.Secret)}),
		  })
		  .then(response => response.json())
		  .then(responseJson => {
			console.log(String(JSON.stringify(responseJson)))
			if(responseJson['checked_in'] == true){
			  Toast.show("User successfully checked in")
              this.props.navigation.state.params.resetState()
              this.props.navigation.navigate("NFC", {email: String(this.props.navigation.state.params.email)})

			}
			else{
			  Toast.show("User check in failed.")
              this.props.navigation.state.params.resetState()
              this.props.navigation.dispatch(NavigationActions.back())
			}
	   })
	}
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
