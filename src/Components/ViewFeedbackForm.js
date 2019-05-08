import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ScrollView,
    Dimensions, 
    Alert,
    TouchableNativeFeedback,
    Modal, 
    AsyncStorage, 
    StyleSheet, 
    ActivityIndicator, 
    BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const apiURL = require('../assets/variables/globals');

const {width, height} = Dimensions.get('window');

class ViewFeedbackForm extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state= {
            temperature: '',
            rh: '',
            wld: '',
            vesda: '',
            remark: '',
            myDataFeedback: {}
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', ()=> {
            this.props.navigation.navigate('TabNavigationSetup');
        });
    }

    submitFeedback() {
        this.props.navigation.navigate('TabNavigationSetup');
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=> {
			return true;
		});
    }

    componentWillMount() {
        var data = this.props.navigation.state.params.data.UserTaskId
        // alert(JSON.stringify(data))

        fetch(`${apiURL.globals.api}/task/scanQRCode/`, {
            method : 'POST',
            headers : {
                'Access-Control-Allow-Credentials' : true,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                UserTaskId: data
            })
        })
        .then((res)=> res.json())
        .then((response) => {
            // alert(JSON.stringify(response.userData[0]));
            this.setState({
                myDataFeedback: response.userData[0]
            });
            // this.props.navigation.navigate('TaskFeedbackForm', { data: response });
        });

    }

    render() {
        const a = this.props.navigation.state.params.data;
        // alert(JSON.stringify(a))
        return (
            <View style= {{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style= {{flexDirection: 'row', justifyContent: 'center', backgroundColor: "#162D5C", alignItems: 'center', padding: 12, width}}>
                    <MaterialCommunityIcons 
                        onPress= {()=> this.props.navigation.navigate('TabNavigationSetup')}
                        name= "keyboard-backspace" color="white" size= {30} style= {{position: 'absolute', left: 10, zIndex: 1000}} />
                    <View style= {{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 16, alignSelf: 'center', textAlign: 'center' }}>
                            {a.AssetCode}
                        </Text>
                        <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'center' }}>
                            {a.AssetLocation}
                        </Text>
                    </View>
                    
                </View>

                <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle= {{width}}>

                <View style= {styles.textFieldView}>

                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'flex-start' }}>
                        Temperature
                    </Text>

                    <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '96%', height: null}}
                        underlineColorAndroid= '#7f8fa6'
                        placeholderTextColor="#7f8fa6"
                        autoCapitalize = 'none'
                        editable= {false}
                        value= {this.state.myDataFeedback["Temperature"]}
                        onChangeText={(text)=> this.setState({ temperature: text })}
                        placeholder= "Temperature"
                    />

                </View>

                <View style= {styles.textFieldView}>

                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'flex-start' }}>
                        RH
                    </Text>

                    <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '96%', height: null}}
                        underlineColorAndroid= '#7f8fa6'
                        editable= {false}
                        placeholderTextColor="#7f8fa6"
                        autoCapitalize = 'none'
                        value= {this.state.myDataFeedback["RH"]}
                        onChangeText={(text)=> this.setState({ rh: text })}
                        placeholder= "RH"
                    />

                </View>

                <View style= {styles.textFieldView}>

                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'flex-start' }}>
                        WLD
                    </Text>

                    <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '96%', height: null}}
                        underlineColorAndroid= '#7f8fa6'
                        placeholderTextColor="#7f8fa6"
                        editable= {false}
                        value= {this.state.myDataFeedback["WLD"]}
                        autoCapitalize = 'none'
                        onChangeText={(text)=> this.setState({ wld: text })}
                        placeholder= "WLD"
                    />

                </View>

                <View style= {styles.textFieldView}>

                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'flex-start' }}>
                        VESDA
                    </Text>

                    <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '96%', height: null}}
                        underlineColorAndroid= '#7f8fa6'
                        placeholderTextColor="#7f8fa6"
                        editable= {false}
                        value= {this.state.myDataFeedback["VESDA"]}
                        autoCapitalize = 'none'
                        onChangeText={(text)=> this.setState({ vesda: text })}
                        placeholder= "VESDA"
                    />

                </View>

                <View style= {styles.textFieldView}>

                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'flex-start' }}>
                        Remark
                    </Text>

                    <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '96%', height: null}}
                        underlineColorAndroid= '#7f8fa6'
                        placeholderTextColor="#7f8fa6"
                        autoCapitalize = 'none'
                        value= {this.state.myDataFeedback["Remark"]}
                        editable= {false}
                        onChangeText={(text)=> this.setState({ remark: text })}
                        placeholder= "Remark"
                    />

                </View>
                </ScrollView>

                <TouchableNativeFeedback
                    onPress= {() => this.submitFeedback()}
                    background={TouchableNativeFeedback.Ripple('#6a89cc')}>
                    <View style={{width, borderRadius: 0, elevation: 4, height: null, paddingVertical: 14, paddingHorizontal: 14, backgroundColor: '#152F56', position: 'absolute', bottom: 0}}>
                        <Text style={{alignSelf: 'center', fontFamily: 'Montserrat Regular', fontSize: 16, color: 'white'}}>Back</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textFieldView: {
		flexDirection: 'column', 
		backgroundColor: 'white', 
		justifyContent: 'center', 
		marginTop: 20, 
		alignItems: 'flex-start',
        padding: 8,
		width: '94%', 
		borderRadius: 4, 
	},
})

export default ViewFeedbackForm;