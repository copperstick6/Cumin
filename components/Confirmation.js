
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Platform,
  BackAndroid,
  BackHandler,
  AsyncStorage
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import API from '../config/api.json'

export class Confirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
      errorMsg : '',
      visible: true,
      userDetails: null,
	    curMsg : null,
      valid: false
    }
    this.backPress = this.backPress.bind(this)
    this.rescan = this.rescan.bind(this)
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
    AsyncStorage.getItem("volunteer").then(function(value){
      if(!(value === null) && this.props.navigation.state.params.email != ''){
        if(!(String(API.API.Secret) == "" || String(API.API.Pepper) == null)){
          console.log(String(API.API.Pepper) + "?email=" + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(value) + "&secret=" + String(API.API.Secret))
          fetch(String(API.API.Pepper) + "?email=" + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(value) + "&secret=" + String(API.API.Secret))
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
  			  if(responseJson['message'] == "User does not exist"){
  				    this.setState({curMsg: String(responseJson['message'])})
  			   }
           else if(responseJson['confirmed'] == false){
              this.setState({curMsg: String(responseJson['name']) + " is not confirmed! Tell attendee to go to desk."})
           }
           else if(responseJson['checked_in'] == true){
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
          });
        }
        else{
          fetch(String(API.API.Pepper) + '?email=' + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(value))
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
          });
        }
      }
      else{
        if(this.props.navigation.state.params.email == ''){
          this.setState({error: true, curMsg: "Please enter something into the email", visible: false})
        }
        else if(value === null){
          this.setState({error: true, curMsg: "Please enter a Volunteer Email", visible: false})
        }
        else{
          this.setState({error: true, curMsg: "Unauthorized/Invalid Checkin link. Please contact an organizer", visible: false})
        }
      }
    }.bind(this))
  }

  backPress() {
    this.props.navigation.state.params.resetState()
  }
  rescan(){
    if(this.state.valid){
      AsyncStorage.getItem("volunteer").then(function(value){
        console.log(String(API.API.Pepper))
        fetch(String(API.API.Pepper), {
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"email": String(this.props.navigation.state.params.email), "volunteer_email": String(value), "secret": String(API.API.Secret)}),
        })
        .then(response => response.json())
        .then(responseJson => {
          console.log(String(JSON.stringify(responseJson)))
          if(responseJson['confirmed'] == true){
            Toast.show("User successfully checked in")
          }
          else{
            Toast.show("User check in failed.")
          }
         this.setState({visible: false})
         this.props.navigation.state.params.resetState()
         this.props.navigation.dispatch(NavigationActions.back())
        })
      }.bind(this))
    }else{
      this.props.navigation.state.params.resetState()
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }

  render(){
    var btn = null;
    var msg = null;
    var chkbtn = null;
    if(!(this.state.visible)){
      btn = <Button style = {styles.button} onPress={this.rescan} title="Go Back"></Button>
      msg = <Text style = {styles.welcome}>{this.state.curMsg}</Text>
    }
    if(this.state.valid){
      chkbtn = <Button onPress={this.rescan} title="Check In User"></Button>
    }
    return(
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} >
      </Spinner>
      {msg}
      {btn}
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
