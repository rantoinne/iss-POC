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
    ToastAndroid,
    Linking, 
    ActivityIndicator, 
    BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
const apiURL = require('../assets/variables/globals');

const {width, height} = Dimensions.get('window');
class Scanner extends Component {

    static navigationOptions= {
		header: null ,
	};

	constructor(props) {
	    super(props);
	    this.state = {
            flashMode: false,
            cameraType: 'back',
            mirrorMode: false,
            loader: false
        };
        this.call = this.call.bind(this);
    }

    componentWillMount() {
        // this.call();
    }

    changeCameraType() {
        if (this.state.cameraType === 'back') {
            this.setState({
                cameraType: 'front',
                mirrorMode: true
            });
        } 
        
        else {
            this.setState({
                cameraType: 'back',
                mirrorMode: false
            });
        }
    }

    onBarCodeRead= async(e) => {
        // alert(JSON.stringify(e.data))
        // this.call();
        this.setState({
            qrValue: e.data,
            loader: true
        });
        var a = e.data;
        let b = a.substring(7, a.length)
        // alert(b)
        
        let that = this;
        setTimeout(() => {
            that.call(b)
        }, 1000);
    }

    call(b) {
        if(this.props.navigation.state.params.lengthForRandom.AssetCode === b) {
            // if(this.state.loader) {
                var data = this.props.navigation.state.params.lengthForRandom.UserTaskId

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
                    // alert(JSON.stringify(response));
                    this.props.navigation.navigate('TaskFeedbackForm', { data: response });
                });
            // }    
        }

        else {
            ToastAndroid.showWithGravityAndOffset(
                'Please scan correct QR Code',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
            this.props.navigation.navigate('Pending');
        }
        
    }

    componentDidMount() {
        // alert(JSON.stringify(this.props.navigation.state.params.lengthForRandom))
        BackHandler.addEventListener('hardwareBackPress', ()=> {
            this.props.navigation.navigate('Pending');
        });
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', ()=> {
			return true;
		});
    }

    render() {
            if(this.state.loader) {
                return (
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size= {30} color= "#27345C" style= {{alignSelf: 'center'}} />
                        <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', marginTop: 10, fontSize: 14, alignSelf: 'center' }}>
                            Processing request..
                        </Text>
                    </View>
                );
            }

            else {
                return (
                    <View style={styles.container}>
                
                        <RNCamera
                            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            style={styles.preview}
                            onBarCodeRead={this.onBarCodeRead}
                            type={this.state.cameraType}
                            mirrorImage={this.state.mirrorMode}
                            ref={cam => (this.camera = cam)}
                        >
            
                        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: height - (height / 2) - 180}}>
                            <Ionicons name= "ios-qr-scanner" size= {width - 90} color= "green" style= {{alignSelf: 'center'}} />
                        </View>

                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20}}>
                            <Ionicons 
                                onPress= {() => this.changeCameraType()}
                                name= "ios-reverse-camera" size= {40} color= "white" style= {{alignSelf: 'center'}} />
                        </View>

                        </RNCamera>

                    </View>
                );
            }
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});

export default Scanner;