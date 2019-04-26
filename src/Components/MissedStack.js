import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Missed from './Missed';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppContainer = createStackNavigator({
  Missed : {
    screen: Missed,
    navigationOptions: {
        headerVisible : false
    }
  }
});

const App = createAppContainer(AppContainer);

export default App;