import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';


export class Entry extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(){
    super()
    this.state = {
      platform : "android"
    }
  }
  componentDidMount(){
    if(Platform.OS === 'ios'){
      this.setState({platform: "ios"})
    }
  }
  render() {
    const nextRoute = {
      component: Camera,
      title: 'Camera'
    };
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
      <Text style={styles.welcome}>
      Hi
      </Text>
      <Button onPress={() => navigate('Camera')} title="Camera">Navigate</Button>
      </View>
    )
  }
}

export class Camera extends Component{

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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
