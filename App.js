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

import {Camera} from './entry'
const electronnative = StackNavigator({
  Home: { screen: Entry },
  Camera: {screen: Camera}
});



AppRegistry.registerComponent('electronnative', () => electronnative);
