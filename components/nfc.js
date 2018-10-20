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
import {
  NavigationActions,
} from 'react-navigation';

export class nfc extends Component {
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
        fetch(String(API.API.NFC) + "/checkin_create_user?email=" + String(this.props.navigation.state.params.email)  + '&id=' + String(this.state.tag))
        this.props.navigation.dispatch(NavigationActions.back())
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
