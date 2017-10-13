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

const App = StackNavigator(Screens, {
    headerMode: "none"
})

export default App;
