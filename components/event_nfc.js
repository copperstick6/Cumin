import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,
} from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import API from '../config/api.json'
import Toast from 'react-native-simple-toast'


export class eventnfc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            tag: null,
            scanned: false
        }
        this.sendRequest = this.sendRequest.bind(this)
        this._startNfc = this._startNfc.bind(this)
        this._onTagDiscovered = this._onTagDiscovered.bind(this)
        this._startDetection = this._startDetection.bind(this)
        this._stopDetection = this._stopDetection.bind(this)
    }
    componentWillMount(){
        this.setState({tag: null, scanned: false})
        console.log(this.props.navigation.state.params.email)
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            })
    }
    componentWillUnmount() {
        this._stopDetection()
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }

    sendRequest(){
        this._stopDetection()
		console.log(String(API.API.NFC) + "/check_user_event?event=" + String(this.props.navigation.state.params.event)  + '&id=' + String(this.state.tag))
        fetch(String(API.API.NFC) + "/check_user_event?event=" + String(this.props.navigation.state.params.event)  + '&id=' + String(this.state.tag))
		.then(json => json.text())
		.then(response => {
			console.log(this.state.tag)
			if(response == "consumed"){
				Toast.show("User has already come for this event.")
			} else if(response == "failed"){
				Toast.show("Error with user, either attendee sneaked in or is not validated")
			}
			else{
				Toast.show("User successfully checked for event!")
				this.setState({scanned: false, tag: null})
			}
		})
    }

    _startNfc() {

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                        this.setState({ tag });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    _onTagDiscovered = tag => {
        this.setState({ tag: tag.id, scanned: true });
    }

    _startDetection = () => {
        NfcManager.registerTagEvent(this._onTagDiscovered)
            .then(result => {
                console.log('registerTagEvent OK', result)
            })
            .catch(error => {
                console.warn('registerTagEvent fail', error)
            })
    }

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
    }

    render() {
        let { supported, enabled, tag } = this.state;
        let tagPrint = <Text>{"\n"}</Text>
        let sendrequest = <Text>{"\n"}</Text>
        if(this.state.scanned){
            tagPrint =  <Text style={{ marginTop: 20 }}>{`Current tag ID: ${JSON.stringify(tag)}`}</Text>
            sendrequest = <Button title="Send NFC data" onPress={this.sendRequest} />

        }
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#F5FCFF',}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
                        <Text style={{ color: 'blue' }}>Start Tag Detection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._stopDetection}>
                        <Text style={{ color: 'red' }}>Stop Tag Detection</Text>
                    </TouchableOpacity>
                    <Text>Scanned: {this.state.scanned.toString()}</Text>
                    {tagPrint}
                    <Text>{"\n"}</Text>
                    {sendrequest}
                </View>
            </ScrollView>
        )
    }

}
