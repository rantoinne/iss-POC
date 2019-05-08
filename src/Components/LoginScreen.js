import React,  { Component } from 'react';
import { View, Text, TextInput, AsyncStorage, StyleSheet, TouchableNativeFeedback, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
const apiURL = require('../assets/variables/globals');
import sha256 from 'js-sha256';

const { width, height } = Dimensions.get('window');

class LoginScreen extends Component {

    static navigationOptions = {
        header : null
    };

    constructor(props) {
        super(props);
        this.state = {
            userMail: "",
            password: "",
            secure: true,
            showPasswordError: false,
            showErrorMessage: ""
        };
        this.timer;
    }

    initiateLogin() {

        if(this.state.userMail === "") {
            clearTimeout(this.timer);
			this.setState({
				showPasswordError: true,
				showErrorMessage: "Enter your email"
			});

			let that = this;
			this.timer = setTimeout(()=> {
				that.setState({
					showPasswordError: false
				})
			}, 3000);
        }

        else if(this.state.password === "") {
            clearTimeout(this.timer);
			this.setState({
				showPasswordError: true,
				showErrorMessage: "Enter your password"
			});

			let that = this;
			this.timer = setTimeout(()=> {
				that.setState({
					showPasswordError: false
				})
			}, 3000);
        }

        else {
            var request = {};

            request["Email"] = this.state.userMail;
            request["Password"] = sha256(this.state.password);

            fetch(`${apiURL.globals.api}/user/login`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(request)
            })
            .then((res)=> res.json())
            .then((response)=> {
                // alert(JSON.stringify(response))
                if(response.type === 0) {
                    this.loginSuccessfulEvent(response.userData);
                    // this.props.navigation.navigate('ProfileScreen')
                }

                else {
                    this.loginFailEvent();
                }
            });
        }        

    }

    async loginSuccessfulEvent(data) {
        
		try {
	        await AsyncStorage.setItem("authToken", data.GroupName);

            try {
                await AsyncStorage.setItem("token", data.userId);
                this.props.navigation.navigate('ProfileScreen')
            }catch(e) {
                alert('Exception occurred');
            }

	    }catch(e) {
            alert('Exception occurred');
		}

        

        this.setState({
			userMail: "",
			password: ""
		});
    }

    loginFailEvent() {
        clearTimeout(this.timer);
			this.setState({
				showPasswordError: true,
				showErrorMessage: "Login Failed"
			});

			let that = this;
			this.timer = setTimeout(()=> {
				that.setState({
					showPasswordError: false
				})
			}, 3000);
    }

    componentDidMount() {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            
                <StatusBar backgroundColor="#27345C" barStyle="light-content" />
                
                <Image
                    source= {require('../assets/Images/f_inverted.png')}
                    resizeMode= "cover"
                    style= {{width, height: 40, position: 'absolute', top: 0}}
                />

                <Image
                    source= {require('../assets/Images/logo.png')}
                    resizeMode= "contain"
                    style= {{width: 100, height: 100, marginTop: -30}}
                />

                <View style= {{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop:10}}>

                    {
                        this.state.showPasswordError ? (
                            <View style= {{ width: (width / 100) * 80, height: null, justifyContent: "center", alignItems: 'center', borderWidth: 0, backgroundColor: "#FA807250", borderRadius: 4, marginTop: 4, padding: 14}}>
                                <Text style= {{ fontFamily: "Montserrat Bold", fontSize: 12, alignSelf: 'center', color: '#DC143C'}}>{this.state.showErrorMessage}</Text>
                            </View>
                        ) : null
                    }

                    <View style= {styles.textFieldView}>

                        <Entypo name="mail" color= "#7f8fa6" size= {20} style= {{alignSelf: 'center', marginRight: 8}} />

                        <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '80%', height: null}}
                            underlineColorAndroid= 'transparent'
                            placeholderTextColor="#7f8fa6"
                            keyboardType= "email-address"
                            value= {this.state.userMail}
                            autoCapitalize = 'none'
                            onChangeText={(text)=> this.setState({ userMail: text })}
                            placeholder= "Email"
                        />

                    </View>

                    <View style= {styles.textFieldView}>

                        {
                            this.state.secure ? (<FontAwesome name="lock" color= "#7f8fa6" size= {24} onPress= {()=> this.setState({ secure: !this.state.secure })} 
                            style= {{alignSelf: 'center', marginRight: 8}} />) :
                            (<FontAwesome name="unlock" color= "#7f8fa6" size= {22} onPress= {()=> this.setState({ secure: !this.state.secure })} 
                            style= {{alignSelf: 'center', marginRight: 8}} />)
                        }

                        <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '80%', height: null}}
                            underlineColorAndroid= 'transparent'
                            placeholderTextColor="#7f8fa6"
                            autoCapitalize = 'none'
                            secureTextEntry= {this.state.secure}
                            value= {this.state.password}
                            onChangeText={(text)=> this.setState({ password: text })}
                            placeholder= "Password"
                        />

                    </View>

                    <TouchableNativeFeedback
                        onPressOut= {()=> this.initiateLogin()}
                        background={TouchableNativeFeedback.Ripple('#6a89cc')}>
                        <View style={{marginTop: 30, width: (width / 100) * 88, borderRadius: 4, elevation: 4, height: null, paddingVertical: 14, paddingHorizontal: 14, backgroundColor: '#152F56'}}>
                            <Text style={{alignSelf: 'center', fontFamily: 'Montserrat Regular', fontSize: 16, color: 'white'}}>Login</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
                
                <View style= {{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 40}}>
                    <Text style={{fontFamily: 'Montserrat SemiBold', fontSize: 16, width: '100%', height: null, textAlign: 'center'}}>
                        Trouble logging in? Click here
                    </Text>
                </View>

                <Image
                    source= {require('../assets/Images/footer.png')}
                    resizeMode= "cover"
                    style= {{width, height: 120, position: 'absolute', bottom: 0}}
                />

                <View style= {{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', position: 'absolute', bottom: 10, right: 10}}>
                    <Text style={{color: 'white', fontFamily: 'Montserrat Light', fontSize: 12, height: null, alignSelf: 'center' }}>
                        V 1.0.0
                    </Text>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldView: {
		flexDirection: 'row', 
		backgroundColor: 'white', 
		justifyContent: 'center', 
		marginTop: 20, 
		alignItems: 'center', 
		width: '94%', 
		borderRadius: 4, 
		borderWidth: 1, 
		borderColor: '#7f8fa6', 
		elevation: 0.5
	},
})

export default LoginScreen;