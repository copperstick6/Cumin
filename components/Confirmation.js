
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Platform,
  BackAndroid,
  BackHandler
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
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
  constructor(props){
    super(props)
    this.reset = this.reset.bind(this)
    this.backPress = this.backPress.bind(this)
    this.rescan = this.rescan.bind(this)
  }
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

  backPress() {
    this.props.navigation.state.params.resetState()
  }
  rescan(){
    this.props.navigation.state.params.resetState()
    this.props.navigation.dispatch(NavigationActions.back())
  }
  reset(){
    /*
    fetch('https://my.hacktx.com/api/check-in', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
*/
    return this.props.navigation.dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home'})
                    ]
                  }));
  }
  static navigationOptions = {
    title: 'Confirmation',
    headerLeft: null
  };

  render(){
    const {navigate} = this.props.navigation
    return(
      <View style={styles.container}>
      <Text style={styles.welcome}>This attendee's email is: </Text>
      <Text style={styles.instructions}>{this.props.navigation.state.params.email}</Text>
      <Text>{"\n"}</Text>
      <View>
      <Button onPress={this.reset} title="Send Email"></Button>
      <Text>{"\n"}{"\n"}{"\n"}</Text>
      <Button onPress={this.rescan} title="Rescan QR Code"></Button>
      </View>
      </View>
    )
  }
}
