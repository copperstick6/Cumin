/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import {ManualInput} from './manInput'
import {Entry} from './entry'
import {Confirmation} from './Confirmation'
import {QrCamera} from './camera'
import {Settings} from './Settings'
const cumin = StackNavigator({
  Home: { screen: Entry },
  QrCamera: {screen: QrCamera},
  Confirmation: {screen: Confirmation},
  Manual: {screen: ManualInput},
  Settings: {screen: Settings, mode:'modal'}
});



AppRegistry.registerComponent('cumin', () => cumin);
