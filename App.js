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

import {Entry} from './entry'
import {Example} from './Example'
import {QrCamera} from './camera'
const electronnative = StackNavigator({
  Home: { screen: Entry },
  QrCamera: {screen: QrCamera},
  Example: {screen: Example}
});



AppRegistry.registerComponent('electronnative', () => electronnative);
