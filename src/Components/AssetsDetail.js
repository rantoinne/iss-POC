import React,  { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableNativeFeedback, 
    StatusBar,
    ToastAndroid,
    Dimensions, 
    TouchableOpacity, 
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Modal,
    BackHandler,
    ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const apiURL = require('../assets/variables/globals');
import DateTimePicker from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

class AssetsDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            userMail: "",
            password: "",
            secure: true,
            secureMain: true,
            secureWork: true,
            secureStand: true,
            userActivitiesData: [],
            showAssetDetails: false,
            isDateTimePickerVisible: false,
            myDate: '',
            loader: true
        };
    }

	componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=> {
			return true;
		});
	}

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    handleDatePicked = (date) => {
        var myDate= date;
        myDate = myDate.toString();
        this.setState({
            myDate
        });
        this.hideDateTimePicker();
    };

    componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', ()=> {
            this.props.navigation.navigate('ProfileScreen');
        });

        const a = Date(Date.now());
        const b = a.toString();
        this.setState({
            myDate: b
        });
        fetch(`${apiURL.globals.api}/assetData/getAll/`, {
            method : 'GET',
            headers : {
                'Access-Control-Allow-Credentials' : true,
                'Content-Type' : 'application/json'
            }
        })
        .then((res)=> res.json())
        .then((response) => {
            this.setState({
                userActivitiesData : response.AssetStatusData,
                loader: false
            });
        })
    }

    truncate(data) {
        
        if(data !== null) {
            let len = data.length;
            return data.substring(0, len-3);
        }

        else {
            return null;
        }

    }

    hideDetails() {
        this.setState({ 
            showAssetDetails: false,
            secure: true,
            secureMain: true,
            secureStand: true,
            secureWork: true
         });

        if(arguments[0] === 1) {
            ToastAndroid.showWithGravityAndOffset(
                'Request processed!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }

        else {
            ToastAndroid.showWithGravityAndOffset(
                'Cancelled!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }
    }

    showAssetDetails(index) {
        this.setState({ 
            showAssetDetails: true ,
            currentIndex: this.state.userActivitiesData[index].AssetCode
        });
    }

    checkActiveRadio() {
        if(arguments[0] === 1) {
            this.setState({
                secure: true,
                secureMain: true,
                secureStand: true,
                secureWork: true
            });
        }
        else if(arguments[0] === 2) {
            this.setState({
                secure: false,
                secureMain: true,
                secureStand: false,
                secureWork: true
            });
        }
        else if(arguments[0] === 3) {
            this.setState({
                secure: false,
                secureMain: false,
                secureStand: true,
                secureWork: true
            });
        }

        else {
            this.setState({
                secure: false,
                secureMain: true,
                secureStand: true,
                secureWork: false
            });
        }
    }

    renderAllJobs(data) {
        return data.map((item, index)=> {
            return (
                <TouchableNativeFeedback
                    onPressOut={()=> this.showAssetDetails(index)}
                    background={TouchableNativeFeedback.Ripple('#6a89cc')}>
                    <View style= {{width, paddingVertical: 10, paddingHorizontal: 10, marginTop: 1, borderBottomWidth: 1, borderColor: '#bdc3c7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={{color: 'black', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'center' }}>
                                {item.AssetCode}
                            </Text>
                            <Text style={{ alignSelf: 'flex-start', color: 'black', fontFamily: 'Montserrat Light', fontSize: 14 }}>
                                {item.AssetTypeName}
                            </Text>
                            <Text style={{color: 'black', fontFamily: 'Montserrat Light', fontSize: 14, alignSelf: 'flex-start' }}>
                                {item.MainType}
                            </Text>
                            <Text style={{color: 'black', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'flex-start' }}>
                                {item.AssetName}
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )
        });
    }

    render() {

        if(this.state.loader) {
            return (
                <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    <ActivityIndicator size= {30} color= "#27345C" style= {{alignSelf: 'center', marginTop: 50}} />
                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'center' }}>
                        Loading..
                    </Text>

                </View>
            );
        }
        
        else {
            return (
                <View style= {{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                    <View style= {{flexDirection: 'row', justifyContent: 'center', backgroundColor: "#27345C", alignItems: 'center', padding: 12, width}}>
                        <MaterialCommunityIcons 
                            onPress= {()=> this.props.navigation.navigate('ProfileScreen')}
                            name= "keyboard-backspace" color="white" size= {28} style= {{position: 'absolute', left: 10}} />
                        <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 18, alignSelf: 'center' }}>
                            Assets
                        </Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle= {{width: '100%'}}>
                    {
                        this.renderAllJobs(this.state.userActivitiesData)
                    }
                    </ScrollView>            
                    
                    <Modal
                        animationType="slide"
                        onBackButtonPress= {()=> this.setState({showAssetDetails: null})}
                        transparent={true}
                        onRequestClose={() => this.setState({showAssetDetails: false})}
                        visible={this.state.showAssetDetails}
                    >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            onPressOut={() => this.setState({showAssetDetails: false})}
                        >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                            <View style={{borderRadius: 10, marginTop: 22, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10, width: '100%', height, backgroundColor: "#2f364030"}}>
                            <TouchableWithoutFeedback>
                                <View style={{borderRadius: 4, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 2, width: '96%', height: height / 2, backgroundColor: "white"}}>

                                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Bold', fontSize: 16, alignSelf: 'center' }}>
                                        {this.state.currentIndex}
                                    </Text>

                                        <TouchableOpacity
                                            style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}
                                            onPressIn= {()=> this.setState({isDateTimePickerVisible: true})}>
                                        <View style= {styles.textFieldView}>
                                            
                                            <TextInput style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '90%', height: 70}}
                                                underlineColorAndroid= '#7f8fa6'
                                                placeholderTextColor="#7f8fa6"
                                                autoCapitalize = 'none'
                                                editable= {false}
                                                onChangeText={(text)=> this.setState({ password: text })}
                                                placeholder= {this.state.myDate}
                                                multiline= {true}
                                            />
                                           

                                            <FontAwesome 
                                                onPress= {()=> this.setState({ isDateTimePickerVisible: true })}
                                                name="calendar" color= "#7f8fa6" size= {24}
                                                style= {{alignSelf: 'center', marginRight: 8}} />
                                             
                                        </View>
                                        </TouchableOpacity>

                                    <View style= {styles.textFieldView1}>

                                        <View style= {{width: '20%'}}>
                                            {
                                                !this.state.secure ? (<Entypo name="circle" color= "#535c68" size= {26} onPress= {()=> this.checkActiveRadio(1)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />) :
                                                (<FontAwesome name="dot-circle-o" color= "#e84393" size= {27} onPress= {()=> this.checkActiveRadio(1)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />)
                                            }
                                        </View>

                                        <View style= {{width: '80%'}}>
                                            <Text 
                                                onPress= {()=> this.checkActiveRadio(1)}
                                                style={{fontFamily: 'Montserrat Regular', fontSize: 16, width: '70%'}}>Working</Text>
                                        </View>
                                    </View>

                                    <View style= {styles.textFieldView1}>

                                        <View style= {{width: '20%'}}>
                                            {
                                                this.state.secureStand ? (<Entypo name="circle" color= "#535c68" size= {26} onPress= {()=> this.checkActiveRadio(2)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />) :
                                                (<FontAwesome name="dot-circle-o" color= "#e84393" size= {27} onPress= {()=> this.checkActiveRadio(2)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />)
                                            }
                                        </View>

                                        <View style= {{width: '80%'}}>
                                            <Text 
                                                onPress= {()=> this.checkActiveRadio(2)}
                                                style={{fontFamily: 'Montserrat Regular', fontSize: 16}}>Stand By</Text>
                                        </View>

                                    </View>

                                    <View style= {styles.textFieldView1}>

                                        <View style= {{width: '20%'}}>
                                            {
                                                this.state.secureMain ? (<Entypo name="circle" color= "#535c68" size= {26} onPress= {()=> this.checkActiveRadio(3)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />) :
                                                (<FontAwesome name="dot-circle-o" color= "#e84393" size= {27} onPress= {()=> this.checkActiveRadio(3)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />)
                                            }
                                        </View>

                                        <View style= {{width: '80%'}}>
                                            <Text 
                                                onPress= {()=> this.checkActiveRadio(3)}
                                                style={{fontFamily: 'Montserrat Regular', fontSize: 16}}>Maintenance</Text>
                                        </View>
                                    </View>

                                    <View style= {styles.textFieldView1}>
                                        <View style= {{width: '20%'}}>
                                            {
                                                this.state.secureWork ? (<Entypo name="circle" color= "#535c68" size= {26} onPress= {()=> this.checkActiveRadio(4)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />) :
                                                (<FontAwesome name="dot-circle-o" color= "#e84393" size= {27} onPress= {()=> this.checkActiveRadio(4)} 
                                                style= {{alignSelf: 'center', marginRight: 8}} />)
                                            }
                                        </View>

                                        <View style= {{width: '80%'}}>
                                            <Text 
                                                onPress= {()=> this.checkActiveRadio(4)}
                                                style={{fontFamily: 'Montserrat Regular', fontSize: 16}}>Not Working</Text>
                                        </View>
                                    </View>

                                    <DateTimePicker
                                        mode= "datetime"
                                        is24Hour= {false}
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={()=> this.hideDateTimePicker()}
                                    />

                                    <View style= {{width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, padding: 8, alignItems: 'center'}}>
                                        <TouchableNativeFeedback
                                            onPressOut= {()=> this.hideDetails()}
                                            background={TouchableNativeFeedback.Ripple('#6a89cc')}>
                                            <View style= {{width: '44%', backgroundColor: '#27345C', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 14, alignSelf: 'center' }}>
                                                    Cancel
                                                </Text>
                                            </View>
                                        </TouchableNativeFeedback>

                                        <TouchableNativeFeedback
                                            onPressOut= {()=> this.hideDetails(1)}
                                            background={TouchableNativeFeedback.Ripple('white')}>
                                            <View style= {{width: '44%', backgroundColor: '#27345C', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{color: 'white', fontFamily: 'Montserrat Medium', fontSize: 14, alignSelf: 'center' }}>
                                                    Submit
                                                </Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </Modal>           

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    textFieldView: {
		flexDirection: 'row', 
		backgroundColor: 'white', 
		justifyContent: 'center', 
		marginTop: 4, 
		alignItems: 'center', 
		width: '94%', 
		borderRadius: 4, 
	},
    textFieldView1: {
		flexDirection: 'row', 
		backgroundColor: 'white', 
		justifyContent: 'flex-start', 
		marginTop: 8,
        paddingHorizontal: 6,
		alignItems: 'center',
        paddingVertical: 0,
        alignSelf: 'flex-start',
		width: '90%', 
	},
})

export default AssetsDetail;