import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast'
export class Volunteer extends Component {
  static navigationOptions = {
    title: 'Manual Input',
  };
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.goHome = this.goHome.bind(this)
  }
  componentWillMount(){
    AsyncStorage.getItem("volunteer").then(function(value){
      if(!(value === null)){
        this.setState({text: value})
      }
    }.bind(this))
  }

  goHome(){
    AsyncStorage.setItem("volunteer", this.state.text)
    Toast.show("Address successfully added.")
    this.props.setNew()
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style = {styles.welcome}>
      Please enter your volunteer email address below.
      </Text>
      <TextInput
        style={{height: 40, width:300}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Text style = {styles.welcome}>
      </Text>
      <Button onPress={this.goHome} title="Next"></Button>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
