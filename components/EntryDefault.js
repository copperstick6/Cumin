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


export class EntryDefault extends Component {
  static navigationOptions = {
	title: 'Welcome',
  };
  constructor(props){
	super(props)
	this.navigateQR = this.navigateQR.bind(this)
	this.navigateManual = this.navigateManual.bind(this)
    this.navigateEvent = this.navigateEvent.bind(this)
  }
  navigateQR(){
	const {navigate} = this.props.navigation
	navigate("Checkin")
  }
  navigateManual(){
	const {navigate} = this.props.navigation
	navigate("Manual")
  }
  navigateEvent(){
    const {navigate} = this.props.navigation
  	navigate("Event")
  }


  render() {
	return (
	  <View style = {styles.container}>
	  <Text style={styles.welcome}>
	  Hi, Welcome to Cumin
	  </Text>
	  <Text style = {styles.instructions}>
	  To get started with check-in:
	  </Text>
	  <Text>{"\n"}</Text>
	  <Button onPress={this.navigateQR} title="Check In">Navigate</Button>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text style = {styles.instructions}>
	  To get started with events:
      </Text>
      <Button onPress={this.navigateEvent} title="Events">Navigate</Button>
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
	backgroundColor: '#FFFFFF',
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
