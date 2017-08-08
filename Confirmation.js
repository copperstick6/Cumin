
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
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

export class Confirmation extends React.Component {
  componentDidMount(){
    this.props.navigation.state.params.resetState
  }
  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.welcome}>This attendee's email is: </Text>
      <Text style={styles.instructions}>{this.props.navigation.state.params.email}</Text>
      </View>
    )
  }
}
