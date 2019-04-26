import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginScreen from './src/Components/LoginScreen';
import ProfileScreen from './src/Components/ProfileScreen';
import Scanner from './src/Components/Scanner';
import SplashScreen from './src/Components/SplashScreen';
import AssetsDetail from './src/Components/AssetsDetail';
import TabNavigationSetup from './src/Components/TabNavigationSetup';
import TaskFeedbackForm from './src/Components/TaskFeedbackForm';
import ViewFeedbackForm from './src/Components/ViewFeedbackForm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppContainer = createStackNavigator({
  SplashScreen : {
    screen : SplashScreen
  },
  LoginScreen : {
    screen: LoginScreen
  },
  ProfileScreen : {
    screen : ProfileScreen
  },
  Scanner : {
    screen : Scanner
  },
  TaskFeedbackForm : {
    screen : TaskFeedbackForm,
    navigationOptions: {
      headerVisible: false
    }
  },
  ViewFeedbackForm : {
    screen : ViewFeedbackForm,
    navigationOptions: {
      headerVisible: false
    }
  },
  AssetsDetail : {
    screen : AssetsDetail,
    navigationOptions: {
      headerVisible: false
    }
  },
  TabNavigationSetup : {
    screen : TabNavigationSetup,
    navigationOptions:({navigation})=> ({
      header : (
                <View
                  style={{
                    height: 60,
                    padding: 18,
                    backgroundColor: '#27345C',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <MaterialCommunityIcons name= "keyboard-backspace" onPress= {() => navigation.navigate('ProfileScreen')} size= {34} color= "white" style= {{alignSelf: 'center'}} />
                  <Text style= {{fontFamily: 'Montserrat Regular', fontSize: 18, color: 'white'}}>Task Details</Text>
                  <MaterialCommunityIcons 
                    name= "qrcode-scan" size= {30} color= "white" style= {{alignSelf: 'center'}} />
                </View>
                )  
    })
  },
  
});

const App = createAppContainer(AppContainer);

export default App;