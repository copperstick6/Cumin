import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Camera from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export class QrCamera extends Component {
  constructor(props){
    super(props)
    this.state = {
      detected: false,
    }
    this.resetState = this.resetState.bind(this)
  }
  componentDidMount(){
    console.log(this.state.detected)
    this.setState({detected: false})
  }
  resetState(){
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
            onBarCodeRead = {this.barcode.bind(this)} onPress={this.takePicture.bind(this)}>
            <Text style={styles.capture}>[CAPTURE]</Text>
          </Camera>
        </View>
      );
    }
    barcode(event){
      console.log(event.data)
      if(!this.state.detected){
        const { navigate } = this.props.navigation;
        navigate("Confirmation", {email: event.data, resetState: this.resetState})
        this.setState({detected: true})
      }

    }

    takePicture() {
      console.warn("entered")
      const options = {};
      //options.location = ...
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
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
