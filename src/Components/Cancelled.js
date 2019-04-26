import React,  { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableNativeFeedback, 
    StatusBar, 
    Dimensions, 
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    ToastAndroid,
    Image,
    AsyncStorage,
    ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const apiURL = require('../assets/variables/globals');
import CustomTab from './CustomTab';

const { width, height } = Dimensions.get('window');

class Cancelled extends Component {

    static navigationOptions = {
        tabBarLabel: 'Cancelled',
        tabBarIcon: ({ tintColor }) => (
        <AntDesign
            name= 'exclamation'
            size= {25}
            color= {tintColor}
            style={{tintColor: tintColor}}
        />
        ),
        headerVisible: false
    };

    constructor(props) {
        super(props);
        this.state = {
            userMail: "",
            password: "",
            secure: true,
            userActivitiesData: [],
            userActivitiesDataMain: [],
            loader: true,
            refreshing: false,
            pendingCount: Number,
            statusLoader: false
        };
    }

    showTaskCount() {
        if(this.state.pendingCount > 1) {
            ToastAndroid.showWithGravityAndOffset(
                `${this.state.pendingCount} tasks are cancelled/incomplete`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }

        else {
            ToastAndroid.showWithGravityAndOffset(
                `${this.state.pendingCount} task is cancelled/incomplete`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }
    }

    componentDidMount() {
        this.setState({
            statusLoader: true
        });

        AsyncStorage.getItem('authToken').then((value) => {
			if(value!== null) {
                fetch(`${apiURL.globals.api}/user/countActivities/`, {
                    method : 'POST',
                    headers : {
                        'Access-Control-Allow-Credentials' : true,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        GroupName: value
                    })
                })
                .then((res)=> res.json())
                .then((response) => {
                    // alert(JSON.stringify(response.UserData))
                    this.setState({
                        pendingCount: response.UserData.incompleteStatus
                    });
                });
			}
            
			else {
                this.props.navigation.navigate('LoginScreen');
            }
        });

        this.setState({
            statusLoader: false
        });
    }

    componentWillMount() {
        this.setState({
            loader: true
        });
        AsyncStorage.getItem('authToken').then((value) => {
			if(value!== null) {
                fetch(`${apiURL.globals.api}/groupList/task/`, {
                    method : 'POST',
                    headers : {
                        'Access-Control-Allow-Credentials' : true,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        GroupName: value
                    })
                })
                .then((res)=> res.json())
                .then((response) => {
                    // alert(JSON.stringify(response))
                    var array = [];
                    response.userData.map((item, index) => {
                        if(item.Status === "Incomplete") {
                            array.push(item);
                        }
                        else {
                            
                        }
                    });

                    this.setState({
                        userActivitiesDataMain: array,
                        loader: false
                    });
                });

			}
            
			else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
        
    }

    truncate(data) {
        
        if(data !== null) {
            let len = data.replace(/T|Z/g,' ');
            if(data.length > 15) {
                return len.substring(0, data.length - 5)
            }
            else {
                return len;
            }
        }

        else {
            return null;
        }
        
    }

    showToast() {
        ToastAndroid.showWithGravityAndOffset(
            'Under Development !',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            50,
        );
    }

    _onRefresh=()=> {
        this.setState({
            refreshing: true
        });
        AsyncStorage.getItem('authToken').then((value) => {
			if(value!== null) {
                // alert(value)
                fetch(`${apiURL.globals.api}/groupList/task/`, {
                    method : 'POST',
                    headers : {
                        'Access-Control-Allow-Credentials' : true,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        GroupName: value
                    })
                })
                .then((res)=> res.json())
                .then((response) => {
                    var array = [];
                    response.userData.map((item, index) => {
                        if(item.Status === "Incomplete") {
                            array.push(item);
                        }
                        else {
                            
                        }
                    });
                    // alert(JSON.stringify(array))


                    this.setState({
                        userActivitiesDataMain: array,
                        loader: false
                    });
                });

                fetch(`${apiURL.globals.api}/user/countActivities/`, {
                    method : 'POST',
                    headers : {
                        'Access-Control-Allow-Credentials' : true,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        GroupName: value
                    })
                })
                .then((res)=> res.json())
                .then((response) => {
                    // alert(JSON.stringify(response.UserData))
                    this.setState({
                        pendingCount: response.UserData.incompleteStatus
                    });
                });
			}
            
			else {
                this.props.navigation.navigate('LoginScreen');
            }
        });

        this.setState({
            refreshing: false
        });
    }

    renderAllJobs(data) {
        return data.map((item, index)=> {
            return (
                <TouchableNativeFeedback
                    onPress= {() => this.showToast()}
                    background={TouchableNativeFeedback.Ripple('#27345C20')}>
                <View style= {{width, paddingVertical: 10, paddingHorizontal: 10, marginTop: 1, borderBottomWidth: 1, borderColor: '#bdc3c7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{color: 'black', fontFamily: 'Montserrat Bold', fontSize: 12, textAlign: 'left' }}>
                            {item.ActivityName}
                        </Text>
                        <Text style={{ alignSelf: 'flex-start', color: 'black', fontFamily: 'Montserrat Light', fontSize: 12 }}>
                            {item.ActivityCode}
                        </Text>
                        <Text style={{color: 'black', fontFamily: 'Montserrat Light', fontSize: 12, alignSelf: 'flex-start' }}>
                            {item.GroupName}
                        </Text>
                        
                        <View style= {{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: 'black', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'flex-start' }}>
                                {this.truncate(item.StartDate === null ? item.ScheduleDate : item.StartDate)}
                            </Text>
                            {/* <Text style={{color: 'black', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'flex-start' }}>
                                {this.truncate(item.StartTime)}
                            </Text> */}
                        </View>

                        <View style= {{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: 'black', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'flex-start' }}>
                                {this.truncate(item.EndDate === null ? item.ScheduleDate : item.EndDate)}
                            </Text>
                            {/* <Text style={{color: 'black', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'flex-start' }}>
                                {this.truncate(item.EndTime)}
                            </Text> */}
                        </View>
                    </View>

                    <View>
                        <Entypo 
                            name= "cross" color= "red" size= {30} style= {{alignSelf: 'center', marginRight: 10}} /> 
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

                    <ScrollView 
                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            title="Loading..."
                            />
                        }
                        showsVerticalScrollIndicator = {false} contentContainerStyle= {{width: '100%'}}>
                    {
                        this.state.userActivitiesDataMain.length === 0 ? 
                        (
                            <View>
                                <Text style={{color: '#27345C', fontFamily: 'Montserrat Medium', fontSize: 14, alignSelf: 'center', marginTop: 40 }}>
                                    No Data!
                                </Text>
                            </View>
                        ) : this.renderAllJobs(this.state.userActivitiesDataMain)
                    }
                    </ScrollView>

                    <TouchableNativeFeedback
                        onPressOut= {()=> this.showTaskCount()}
                        background={TouchableNativeFeedback.Ripple('white')}>
                        <View style= {{position: 'absolute', right: 10, bottom: 10, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#27345C', elevation: 2}}>
                            {
                                this.state.statusLoader ? (
                                    <ActivityIndicator color= "white" size= {20} style= {{alignSelf: 'center'}} />
                                ) : (
                                    <Text style={{color: 'white', fontFamily: 'Montserrat Regular', fontSize: 14, alignSelf: 'center' }}>
                                        {this.state.pendingCount}
                                    </Text>
                                )
                            }
                        </View>
                    </TouchableNativeFeedback>
                    
                </View>
            );
        }    
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

export default Cancelled;