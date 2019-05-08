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
    Image,
    RefreshControl,
    ToastAndroid,
    AsyncStorage,
    ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const apiURL = require('../assets/variables/globals');
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

class Completed extends Component {

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
            statusLoader: false,
            pendingCount: Number
        };
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
                    // alert(JSON.stringify(response.UserData.completedStatus))
                    this.setState({
                        pendingCount: response.UserData.completedStatus
                    });
                });

			}
            
			else {
                // this.props.navigation.navigate('LoginScreen');
            }
        });

        this.setState({
            statusLoader: false
        });
    }

    componentWillMount() {
        
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
                        if(item.Status === "Completed") {
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
                // this.props.navigation.navigate('LoginScreen');
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
                        if(item.Status === "Completed") {
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
                    // alert(JSON.stringify(response.UserData.completedStatus))
                    this.setState({
                        pendingCount: response.UserData.completedStatus
                    });
                });
			}
            
			else {
                // this.props.navigation.navigate('LoginScreen');
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
                    onPress= {() => this.props.navigation.navigate('ViewFeedbackForm', { data : this.state.userActivitiesDataMain[index] })}
                    background={TouchableNativeFeedback.Ripple('#2dce8940')}>
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
                        <MaterialCommunityIcons 
                            onPress= {() => this.props.navigation.navigate('ViewFeedbackForm', { data : this.state.userActivitiesDataMain[index] })}
                            name= "eye-check" color= "green" size= {30} style= {{alignSelf: 'center', marginRight: 10}} /> 
                    </View>
                </View>
                </TouchableNativeFeedback>
            )
        });
    }

    showTaskCount() {
        if(this.state.pendingCount > 1) {
            ToastAndroid.showWithGravityAndOffset(
                `${this.state.pendingCount} tasks are completed`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }

        else {
            ToastAndroid.showWithGravityAndOffset(
                `${this.state.pendingCount} task is completed`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50,
            );
        }
    }

    render() {

        if(this.state.loader) {
            return (
                <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center',width: '100%', height}}>

                    
                    <View style= {{justifyContent: 'center', alignItems: 'center', width, height}}>
                    <ActivityIndicator size= {30} color= "#30336b" style= {{alignSelf: 'center'}} />
                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Medium', fontSize: 12, alignSelf: 'center' }}>
                        Loading..
                    </Text>
                    </View>

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
                                <View style= {{width: '100%'}}>
                                    <Text style={{color: '#27345C', fontFamily: 'Montserrat Medium', textAlign: 'center', fontSize: 14, alignSelf: 'center', marginTop: 40 }}>
                                        No Data!
                                    </Text>
                                </View>
                            ) : this.renderAllJobs(this.state.userActivitiesDataMain)
                    }
                    </ScrollView>            
                    
                    {
                        this.state.userActivitiesDataMain.length === 0 ? (
                             null   
                        ) : (<TouchableNativeFeedback
                        onPressOut= {()=> this.showTaskCount()}
                        background={TouchableNativeFeedback.Ripple('white')}>
                        <View style= {{position: 'absolute', right: 0, bottom: -20, width: 70, height: 70, borderTopLeftRadius: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#27345C', elevation: 4}}>
                            {
                                this.state.statusLoader ? (
                                    <ActivityIndicator color= "white" size= {20} style= {{alignSelf: 'center'}} />
                                ) : (
                                    <>
                                    <Text style={{color: 'white', fontFamily: 'Montserrat Bold', fontSize: 16, marginLeft: 20, alignSelf: 'center' }}>
                                        {this.state.pendingCount}
                                    </Text>
                                    <Text style={{color: 'white', fontFamily: 'Montserrat Bold', fontSize: 10, marginLeft: 20, alignSelf: 'center' }}>
                                        tasks
                                    </Text>
                                    </>
                                )
                            }
                        </View>
                    </TouchableNativeFeedback>)
                    }

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
		marginTop: 20, 
		alignItems: 'center', 
		width: '94%', 
		borderRadius: 4, 
		borderWidth: 1, 
		borderColor: '#7f8fa6', 
		elevation: 0.5
	},
})

export default withNavigation(Completed);