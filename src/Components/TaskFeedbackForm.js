import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ToastAndroid,
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

class TaskFeedbackForm extends Component {

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
            remark: ''
        };
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    submitFeedback() {

        var request = {};

        ToastAndroid.showWithGravityAndOffset(
        'Feedback submitted',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50,
        );

        const a = this.props.navigation.state.params.data.userData[0];

        request["UserTaskId"] = a.UserTaskId;
        request["Status"] = "Completed";
        request["Temperature"] = this.state.temperature;
        request["RH"] = this.state.rh;
        request["WLD"] = this.state.wld;
        request["VESDA"] = this.state.vesda;
        request["Remark"] = this.state.remark;

        fetch(`${apiURL.globals.api}/user/statusUpdate/`, {
            method : 'POST',
            headers : {
                'Access-Control-Allow-Credentials' : true,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then((res)=> res.json())
        .then((response) => {
            // alert(JSON.stringify(response));
            this.props.navigation.navigate('Pending', { reLoader: true });
        });
    }

    render() {
        const a = this.props.navigation.state.params.data.userData[0];
        // alert(JSON.stringify(a))
        return (
            <View style= {{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style= {{flexDirection: 'row', justifyContent: 'center', backgroundColor: "#27345C", alignItems: 'center', padding: 12, width}}>
                    <MaterialCommunityIcons 
                        onPress= {()=> this.props.navigation.navigate('Pending')}
                        name= "arrow-left" color="white" size= {28} style= {{position: 'absolute', left: 10}} />
                    <View style= {{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 14, alignSelf: 'center' }}>
                            {a.AssetCode}
                        </Text>
                        <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'center' }}>
                            {a.ActivityName}
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
                        keyboardType= 'numeric'
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
                        placeholderTextColor="#7f8fa6"
                        autoCapitalize = 'none'
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
                        onChangeText={(text)=> this.setState({ remark: text })}
                        placeholder= "Remark"
                    />

                </View>
                </ScrollView>

                <TouchableNativeFeedback
                    onPress= {() => this.submitFeedback()}
                    background={TouchableNativeFeedback.Ripple('#6a89cc')}>
                    <View style={{width, borderRadius: 0, elevation: 4, height: null, paddingVertical: 14, paddingHorizontal: 14, backgroundColor: '#152F56', alignSelf: 'flex-end'}}>
                        <Text style={{alignSelf: 'center', fontFamily: 'Montserrat Regular', fontSize: 16, color: 'white'}}>Submit</Text>
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

export default TaskFeedbackForm;