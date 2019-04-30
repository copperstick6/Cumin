import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView
} from 'react-native'

export class Events extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress(eventName){
      console.log(eventName)
      const { navigate } = this.props.navigation;
      navigate("Eventnfc", {email: "asdsad", event: eventName})
  }

 render() {
   return (
     <ScrollView style={styles.container}>
       <Button
         style={styles.button}
         onPress={() => this.onPress("Lunch_1")}
         title="Lunch 1"
       >
       </Button>

       <Text>{"\n"}</Text>

	   <Button
         style={styles.button}
         onPress={() => this.onPress("ReactHomeDepot")}
         title="Home Depot React Workshop"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("AIMSFT")}
         title="Microsoft AI Talk"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("Dinner")}
         title="Dinner"
       >
       </Button>
       <Text>{"\n"}</Text>

	   <Button
         style={styles.button}
         onPress={() => this.onPress("CTF")}
         title="CTF"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("YogoHomeDepot")}
         title="Home Depot Yoga"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("Midnight")}
         title="Midnight Snack"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("Breakfast")}
         title="Breakfast"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("HoppyHour")}
         title="Hoppy Hour"
       >
       </Button>
       <Text>{"\n"}</Text>
	   <Button
         style={styles.button}
         onPress={() => this.onPress("Lunch_2")}
         title="Lunch 2"
       >
       </Button>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 30
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})
