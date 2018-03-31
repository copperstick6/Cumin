import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Vibration
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Camera from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export class QrCamera extends Component {
  static navigationOptions = {
	title: 'Camera',
  };
  constructor(props){
	super(props)
	this.state = {
	  detected: false,
	}
	this.resetState = this.resetState.bind(this)
  }
  componentWillMount(){
	console.log(this.state.detected)
	this.setState({detected: false})
  }
  resetState(){
	console.log("entered")
	this.setState({detected: false})
  }
	render() {
	  return (
		<View style={styles.container}>
		  <Camera
			ref={(cam) => {
			  this.camera = cam;
			}}
			style={styles.preview}
			aspect={Camera.constants.Aspect.fill}
			onBarCodeRead = {this.barcode.bind(this)}>
		  </Camera>
		</View>
	  );
	}
	barcode(event){
	  if(!this.state.detected){
		Vibration.vibrate()
		const { navigate } = this.props.navigation;
		navigate("Confirmation", {data: JSON.parse(event.data), resetState: this.resetState})
		this.setState({detected: true})
	  }
	}

  }

  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'row',
	},
	preview: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  alignItems: 'center'
	},
	capture: {
	  flex: 0,
	  backgroundColor: '#fff',
	  borderRadius: 5,
	  color: '#000',
	  padding: 10,
	  margin: 40
	}
  });
