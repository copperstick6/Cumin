
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


export class Confirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
      errorMsg : '',
      visible: true
    }
    this.backPress = this.backPress.bind(this)
    this.rescan = this.rescan.bind(this)
  }
  static navigationOptions = {
    title: 'Confirmation',
    headerLeft: null,
    userDetails: null
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
      if(!(value === null)){
        fetch('https://my.hacktx.com/api/check-in?email=' + String(this.props.navigation.state.params.email) + '&volunteer_email=' + String(value))
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          var userData = {
            name: responseJson.name,
            school: responseJson.school,
            email: responseJson.email,
            age: responseJson.age,
            checked_in: responseJson.checked_in,
            confirned: responseJson.confirmed,
            birthday: responseJson.birthday
          }
          this.setState({visible: false})
        })
        .catch((error) => {
          console.log(error)
          this.setState({error: true, errorMsg: String(error), visible: false})
        });
      }
      else{
        this.setState({error: true, errorMsg: "Invalid Email", visible: false})
      }
    }.bind(this))
  }

  backPress() {
    this.props.navigation.state.params.resetState()
  }
  rescan(){
    this.props.navigation.state.params.resetState()
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
    var msg = null;
    if(!(this.state.visible)){
      msg = <Text>HI</Text>
    }
    return(
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} >
      </Spinner>
      {msg}
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
