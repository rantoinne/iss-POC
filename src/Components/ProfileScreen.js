import React,  { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableNativeFeedback, 
    Modal, 
    ToastAndroid, 
    BackHandler, 
    TouchableWithoutFeedback, 
    Dimensions, 
    Alert, 
    AsyncStorage, 
    TouchableOpacity, 
    Image, 
    ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const apiURL = require('../assets/variables/globals');
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

class ProfileScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            email: '',
            Designation: '',
            userName: '',
            showAssetDetails: false
        };
    }

    async componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', ()=> {
			return true;
		});
        // alert('hsh')
        AsyncStorage.getItem('token').then((value) => {
            if(value!== null) {
                // alert(value)
                fetch(`${apiURL.globals.api}/userData/get`, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Credentials' : true,
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        "UserId": value
                    })
                })
                .then((res)=> res.json())
                .then((response)=> {
                    // alert(JSON.stringify(response))
                    this.setState({
                        address: response.UserData.userAddress,
                        userName: response.UserData.userName,
                        email : response.UserData.Email,
                        designation : response.UserData.designation
                    });
                });
			}

			else {
				this.setState({token: null});
			}
		});

    }

    logOut =async()=>{

		Alert.alert(
			'Logout',
			'Are you sure?',
			[
			  {text: 'Yes', onPress: () => this.confirmLogout()},
			  {text: 'No', style: 'cancel'},
			],
			{cancelable: true},
		);

	}

    handleProfileModalOperation() {

        if(arguments[0] === 1) {
            this.setState({
                showAssetDetails: false
            });
            this.logOut();
        }

        else {
            this.setState({
                showAssetDetails: false
            });

            ToastAndroid.showWithGravityAndOffset(
                'Not available !',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }
    }

	confirmLogout= async()=> {
		let res = await AsyncStorage.clear();
        this.props.navigation.navigate('LoginScreen');
	}

    callme() {
        ToastAndroid.showWithGravityAndOffset(
        'Under Development !',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50,
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=> {
			return true;
		});
    }

    render() {
        return (
            <View style= { styles.container }>

            
            <View style= {{flexDirection: 'column', width, justifyContent: 'space-evenly', alignItems: 'center'}}>

                <LinearGradient
                    colors= {["#3AC1A2", "#162C5B"]}
                    start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 0 }}
                    style= {{width: '100%', justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: '#162D5C'}}>

                    <View style= {{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop:10, alignItems: 'center', paddingHorizontal: 4, paddingVertical: 20, backgroundColor: 'transparent'}}>

                        <View style= {{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source= {require('../assets/Images/profileIcon.png')}
                                resizeMode= "contain"
                                style= {{alignSelf: 'center', width: 70, height: 70}}
                            />
                        </View>

                        <View style= {{flexDirection: 'column', width: '70%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 8}}>
                            <Text style= {{fontFamily: 'Montserrat ExtraBold', color: "white", fontSize: 16}}>
                                {this.state.userName}
                            </Text>
                            <Text style= {{fontFamily: 'Montserrat Regular', color: "#dfe6e9", fontSize: 12, marginTop: 2 }}>
                                {this.state.designation}
                            </Text>
                            
                            <Text style= {{fontFamily: 'Montserrat Regular', color: "#dfe6e9", fontSize: 12, marginTop: 2 }}>
                                {this.state.email}
                            </Text>
                        </View>

                            <SimpleLineIcons 
                                onPress= {()=> this.setState({ showAssetDetails: true })}
                                name= "options-vertical" size= {24} color= "white" style= {{alignSelf: 'flex-end', position: 'absolute', top: 10, right: 10}} />

                            <Modal
                                animationType="slide"
                                onBackButtonPress= {()=> this.setState({showAssetDetails: null})}
                                transparent={true}
                                onRequestClose={() => this.setState({showAssetDetails: false})}
                                visible={this.state.showAssetDetails}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4, width: '40%', height: (height / 100) * 40, position: 'absolute', top: 10, right: 0}}>
                                    <View style={{borderRadius: 4, marginTop: 22, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, width: '100%', height: '100%', backgroundColor: "black"}}>
                                        
                                            <View style={{borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 2, width: '100%', height: '100%' }}>

                                            <TouchableOpacity
                                                onPress= {()=> this.handleProfileModalOperation()}
                                            >
                                                <View style= {{ width: (( width / 100 ) * 30) }}>
                                                <Text style= {{alignSelf: 'flex-start', fontFamily: 'Montserrat Regular', color: "white", fontSize: 14, marginTop: 2, padding: 4}}>
                                                    Network
                                                </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress= {()=> this.handleProfileModalOperation()}>
                                                <View style= {{ width: (( width / 100 ) * 30) }}>
                                                <Text style= {{alignSelf: 'flex-start', fontFamily: 'Montserrat Regular', color: "white", fontSize: 14, marginTop: 2, padding: 4 }}>
                                                    Email Data
                                                </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress= {()=> this.handleProfileModalOperation()}>
                                                <View style= {{ width: (( width / 100 ) * 30) }}>
                                                <Text style= {{alignSelf: 'flex-start', fontFamily: 'Montserrat Regular', color: "white", fontSize: 14, marginTop: 2, padding: 4 }}>
                                                    ReConfig
                                                </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress= {()=> this.handleProfileModalOperation()}>
                                                <View style= {{ width: (( width / 100 ) * 30) }}>
                                                <Text style= {{alignSelf: 'flex-start', fontFamily: 'Montserrat Regular', color: "white", fontSize: 14, marginTop: 2, padding: 4}}>
                                                    Setting
                                                </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress= {()=> this.handleProfileModalOperation(1)}>
                                                <View style= {{ width: (( width / 100 ) * 30) }}>
                                                <Text style= {{alignSelf: 'flex-start', fontFamily: 'Montserrat Regular', color: "white", fontSize: 14, marginTop: 2, padding: 4}}>
                                                    Logout
                                                </Text>
                                                </View>
                                            </TouchableOpacity>

                                            </View>
                                    </View>
                                </View>
                        </Modal>

                    </View>
                </LinearGradient>

                

                <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 20, marginTop: 20}}>

                    <View style= {{flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10}}>

                        <TouchableNativeFeedback
                            onPressOut= {()=> this.props.navigation.navigate('AssetsDetail')}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>

                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 6, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            {/* <AntDesign name="piechart" size={50} color= "#27345C" style= {{alignSelf: 'center'}} /> */}
                            <Image
                                source= {require('../assets/Images/asset.png')}
                                resizeMode= "cover"
                                style= {{width: 52, height: 52, alignSelf: 'center'}}
                            />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Asset
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPressOut= {()=> this.props.navigation.navigate('TabNavigationSetup')}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            {/* <FontAwesome5 name= "user-astronaut" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} /> */}
                            <Image
                                source= {require('../assets/Images/jobCard.png')}
                                resizeMode= "cover"
                                style= {{width: 52, height: 52, alignSelf: 'center'}}
                            />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Job Card
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <Entypo name= "bell" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 4}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Warning
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style= {{flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10}}>
                        
                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <Octicons name= "checklist" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                CheckList
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <FontAwesome name= "refresh" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Synchronise
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>
                        
                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <Entypo name= "ticket" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                HelpDesk
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style= {{flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10}}>
                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <MaterialCommunityIcons name= "clipboard-check" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Work Permit
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>
                        
                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>

                            <FontAwesome5 name= "exclamation-triangle" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {{flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text numberOfLines= {2} style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                Incident Report
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPressOut= {()=> this.callme()}
                            background={TouchableNativeFeedback.Ripple('#27345C20')}>
                            <View style= {{ width: (( width / 100 ) * 28), height : (( width / 100 ) * 28), padding: 4, borderRadius: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', elevation: 4 }}>
                
                            <AntDesign name= "calendar" color= "#27345C" size= {50} style= {{alignSelf: 'center', marginTop: 10}} />

                            <View style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                <Text style= {height < 650 ? styles.menuTextLowWidth : styles.menuText}>
                                PPM
                                </Text>
                            </View>
                            </View>
                        </TouchableNativeFeedback>
                        
                    </View>

                </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EEEEF3'
    },
    imageIcon : {
        width : (width / 100) * 20,
        height: (height / 100) * 20,
        alignSelf: "center",
    },
    menuText: {
        alignSelf: 'center', 
        color: "#27345C", 
        fontFamily: "Montserrat Regular", 
        fontSize: 16,
        textAlign: 'center'
    },
    menuTextLowWidth: {
        alignSelf: 'center', 
        color: "#27345C", 
        fontFamily: "Montserrat Regular", 
        fontSize: 13,
        textAlign: 'center'
    }

});

export default ProfileScreen;