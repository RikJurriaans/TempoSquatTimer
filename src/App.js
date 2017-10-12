import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Screens from './screens/Screens.js';

const App = StackNavigator({
    ConfigurationScreen: { screen: Screens.ConfigurationScreen },
    Timer: { screen: Screens.TimerScreen }
}, {
    headerMode: "none"
})

export default App;
