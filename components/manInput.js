import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Button } from 'react-native';

export class ManualInput extends Component {
  static navigationOptions = {
    title: 'Manual Input',
  };
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.confirmationScreen = this.confirmationScreen.bind(this)
    this.resetState = this.resetState.bind(this)
  }
  resetState(){
    this.setState({text: ''})
  }
  confirmationScreen(){
    const { navigate } = this.props.navigation;
    navigate("Confirmation", {email: this.state.text, resetState: this.resetState})
    console.log("pressed")
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style = {styles.welcome}>
      Please enter the email address below.
      </Text>
      <TextInput
        style={{height: 40, width:300}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Text style = {styles.welcome}>
      </Text>
      <Button onPress={this.confirmationScreen} title="Next"></Button>
      </View>

    );
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
