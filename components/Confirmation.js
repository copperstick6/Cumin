
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
  }
  componentDidMount(){
    if(!(Platform.OS === 'ios')){
        BackHandler.addEventListener('hardwareBackPress', this.backPress);
    }
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.backPress);
}

  backPress() {
    this.props.navigation.state.params.resetState()
  }
  reset(){
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
      <View>
      <Button onPress={this.reset} title="Navigate Back to Home"></Button>
      </View>
      </View>
    )
  }
}
