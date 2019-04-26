import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Dimensions, 
    Alert, 
    Modal, 
    AsyncStorage, 
    StyleSheet, 
    Linking, 
    ActivityIndicator, 
    BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const apiURL = require('../assets/variables/globals');

class CustomTab extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
            
        };
    }

    

    render() {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Entypo
                        name= 'stopwatch'
                        size= {25}
                        color= {this.props.tintColor}
                        style={{tintColor: this.props.tintColor}}
                    />
                    <Text style= {{color: 'white'}}>{this.props.count}</Text>
                </View>
            );
        }
    }

const styles = StyleSheet.create({
    
});

export default CustomTab;