import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { 
    Platform, 
    View, 
    ScrollView, 
    StyleSheet, 
    TouchableNativeFeedback,
    BackHandler,
    Dimensions,
    Animated,
    Text } from 'react-native';
import Missed from './Missed';
import Cancelled from './Cancelled';
import Pending from './Pending';
import Completed from './Completed';
import Incomplete from './Incomplete';
import Scheduled from './Scheduled';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const Scheduled_S = <Scheduled />
const Pending_S = <Pending />
const Completed_S = <Completed />
const Cancelled_S = <Cancelled />
const Missed_S = <Missed />
const Incomplete_S = <Incomplete />

const tabs = ['COMPLETED', 'INCOMPLETE', 'PENDING', 'MISSED', 'SCHEDULED', 'CANCELLED'];

class TabNavigationSetup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTabIndex: 0,
            topScrollHeight: 0,
        };
        this.completeAnimation = new Animated.Value(0);
        this.incompleteAnimation = new Animated.Value(0);
        this.pendingAnimation = new Animated.Value(0);
        this.missedAnimation = new Animated.Value(0);
        this.scheduledAnimation = new Animated.Value(0);
        this.cancelledAnimation = new Animated.Value(0);

    }

    componentDidMount() {
        this.incompleteAnimation.setValue(0);
        this.pendingAnimation.setValue(0);
        this.missedAnimation.setValue(0);
        this.scheduledAnimation.setValue(0);
        this.cancelledAnimation.setValue(0);

        Animated.timing(this.completeAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    changeCurrentTabIndex(index) {

        this.refs.tabView.scrollTo({ x: (( (index + 1) - 1 ) * width ), y: 0, animated: true });
        
        this.setState({
            currentTabIndex: index,
        });
        
        this.renderAnimation(index);

    }

    renderAnimation(index) {
        this.refs.tabBar.scrollTo({ x: (( (( index - 1 ) + 1) - 1 ) * width ), y: 0, animated: true });
        if(index === 0) {

            this.incompleteAnimation.setValue(0);
            this.pendingAnimation.setValue(0);
            this.missedAnimation.setValue(0);
            this.scheduledAnimation.setValue(0);
            this.cancelledAnimation.setValue(0);

            Animated.timing(this.completeAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

        else if(index === 1) {

            this.completeAnimation.setValue(0);
            this.cancelledAnimation.setValue(0);
            this.pendingAnimation.setValue(0);
            this.missedAnimation.setValue(0);
            this.scheduledAnimation.setValue(0);
            
            Animated.timing(this.incompleteAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

        else if(index === 2) {

            this.completeAnimation.setValue(0);
            this.cancelledAnimation.setValue(0);
            this.incompleteAnimation.setValue(0);
            this.missedAnimation.setValue(0);
            this.scheduledAnimation.setValue(0);

            Animated.timing(this.pendingAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

        else if(index === 3) {

            this.completeAnimation.setValue(0);
            this.cancelledAnimation.setValue(0);
            this.pendingAnimation.setValue(0);
            this.incompleteAnimation.setValue(0);
            this.scheduledAnimation.setValue(0);

            Animated.timing(this.missedAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

        else if(index === 4) {
            
            this.completeAnimation.setValue(0);
            this.cancelledAnimation.setValue(0);
            this.pendingAnimation.setValue(0);
            this.missedAnimation.setValue(0);
            this.incompleteAnimation.setValue(0);

            Animated.timing(this.scheduledAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

        else if(index === 5) {
            
            this.completeAnimation.setValue(0);
            this.scheduledAnimation.setValue(0);
            this.pendingAnimation.setValue(0);
            this.missedAnimation.setValue(0);
            this.incompleteAnimation.setValue(0);

            Animated.timing(this.cancelledAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }

    scrollEventCapture=async(event)=> {
        var idx = -2;
        if(Math.trunc(event.nativeEvent.contentOffset.x) === Math.trunc(width)) {
            idx = 1;
            this.setIdx(1);
        }

        else if(Math.trunc(event.nativeEvent.contentOffset.x) === Math.trunc(width * 2)) {
            idx = 2;
            this.setIdx(2);
        }

        else if(Math.trunc(event.nativeEvent.contentOffset.x) === Math.trunc(width * 3)) {
            idx = 3;
            this.setIdx(3);
        }

        else if(Math.trunc(event.nativeEvent.contentOffset.x) === Math.trunc(width * 4)) {
            idx = 4;
            this.setIdx(4);
        }

        else if(Math.trunc(event.nativeEvent.contentOffset.x) === Math.trunc(width * 5)) {
            idx = 5;
            this.setIdx(5);
        }

        else if(event.nativeEvent.contentOffset.x === 0) {
            idx = 0;
            this.setIdx(0);
        }

        this.setIdx(idx);
        this.refs.tabBar.scrollTo({ x: (( (( idx - 1 ) + 1) - 1 ) * width ), y: 0, animated: true });

        this.renderAnimation(idx);

    }

    setIdx(idx) {
        this.setState({
            currentTabIndex: idx
        });
    }

    tabsRender() {

        return tabs.map((tab, index)=> {
            switch(tab) {
                case 'SCHEDULED' : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.scheduledStyle : styles.tabBarStyle}>
                                <Animated.View style= {{
                                    backfaceVisibility: 'hidden',
                                    transform: [
                                        {
                                            rotate: this.scheduledAnimation.interpolate({
                                                inputRange: [0,1],
                                                outputRange: ["360deg", "0deg"]
                                            })
                                        },
                                        {
                                            scale: this.scheduledAnimation.interpolate({
                                                inputRange: [0,1],
                                                outputRange: [1, 1.30]
                                            })
                                        }
                                    ]
                                }}>
                                <AntDesign
                                    name= 'calendar'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center'}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );

                case 'COMPLETED' : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.completedStyle : styles.tabBarStyle}>
                            <Animated.View style= {{
                                backfaceVisibility: 'hidden',
                                transform: [
                                    {
                                        rotate: this.completeAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ["360deg", "0deg"]
                                        })
                                    },
                                    {
                                        scale: this.completeAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [1, 1.30]
                                        })
                                    }
                                ]
                            }}>
                                <Entypo
                                    name= 'check'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center'}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );

                case 'PENDING' : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.pendingStyle : styles.tabBarStyle}>
                            <Animated.View style= {{
                                backfaceVisibility: 'hidden',
                                transform: [
                                    {
                                        rotate: this.pendingAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ["360deg", "0deg"]
                                        })
                                    },
                                    {
                                        scale: this.pendingAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [1, 1.30]
                                        })
                                    }
                                ]
                            }}>
                                <MaterialCommunityIcons
                                    name= 'clock-alert-outline'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center', marginBottom: 4}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );

                case 'MISSED' : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.missedStyle : styles.tabBarStyle}>
                            <Animated.View style= {{
                                backfaceVisibility: 'hidden',
                                transform: [
                                    {
                                        rotate: this.missedAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ["360deg", "0deg"]
                                        })
                                    },
                                    {
                                        scale: this.missedAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [1, 1.30]
                                        })
                                    }
                                ]
                            }}>
                                <AntDesign
                                    name= 'exclamation'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center'}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );

                case 'INCOMPLETE' : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.incompleteStyle : styles.tabBarStyle}>
                            <Animated.View style= {{
                                backfaceVisibility: 'hidden',
                                transform: [
                                    {
                                        rotate: this.incompleteAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ["360deg", "0deg"]
                                        })
                                    },
                                    {
                                        scale: this.incompleteAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [1, 1.30]
                                        })
                                    }
                                ]
                            }}>
                                <Entypo
                                    name= 'circle-with-minus'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center', marginBottom: 4}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );

                default : return (
                    <TouchableNativeFeedback
                        onPress= {()=> this.changeCurrentTabIndex(index)}
                        background={TouchableNativeFeedback.Ripple('white')}>
                            <View style= {this.state.currentTabIndex === index ? styles.cancelledStyle : styles.tabBarStyle}>
                            <Animated.View style= {{
                                backfaceVisibility: 'hidden',
                                transform: [
                                    {
                                        rotate: this.cancelledAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ["360deg", "0deg"]
                                        })
                                    },
                                    {
                                        scale: this.cancelledAnimation.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [1, 1.30]
                                        })
                                    }
                                ]
                            }}>
                                <Entypo
                                    name= 'cross'
                                    size= {22}
                                    color= "white"
                                    style={{alignSelf: 'center'}}
                                />
                                <Text style= {{fontSize: 8, fontFamily: 'Montserrat Bold', color: 'white'}}>
                                    {tab}
                                </Text>
                                </Animated.View>
                            </View>
                    </TouchableNativeFeedback>
                );
            }
            
        });
    }

    layoutConfigs(event) {
        // alert(JSON.stringify(event.nativeEvent))
        this.setState({
            topScrollHeight: event.nativeEvent.layout.height + 60
        });
    }

    screenRenderForTabs() {
        var value = this.state.currentTabIndex;
        
        const screens = [Completed_S, Incomplete_S, Pending_S, Missed_S, Scheduled_S, Cancelled_S ];

        return screens.map((screen, idx)=> {
            return (
                <View style= {{width, height: height-this.state.topScrollHeight - 40, justifyContent: 'flex-start', alignItems: 'center'}}>
                    {screens[idx]}
                </View>
            );
        })
    }

    render() {
        // alert(width * 2)
        return (
            <View style= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View 
                    onLayout={(event)=> this.layoutConfigs(event)}
                    style= {{width: '100%'}}>
                    <ScrollView decelerationRate={'fast'} ref= "tabBar" horizontal  showsHorizontalScrollIndicator= {false} >
                        {
                            this.tabsRender()
                        }
                    </ScrollView>
                </View>

                <ScrollView ref= "tabView" onMomentumScrollEnd = {this.scrollEventCapture} horizontal pagingEnabled showsHorizontalScrollIndicator= {false} >
                    {
                        this.screenRenderForTabs()
                    }
                </ScrollView>
            </ View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarStyle: { 
        padding: 8, 
        width: 100, 
        backgroundColor: '#162D5C', 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
        elevation: 4
    },
    activeTabBarStyle: { 
        padding: 8, 
        width: 100, 
        backgroundColor: '#27345C90', 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    scheduledStyle: { 
        padding: 8, 
        width: 100, 
        backgroundColor: '#11cdef', 
        elevation: 8,
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    pendingStyle: { 
        padding: 8, 
        width: 100, 
        elevation: 8,
        backgroundColor: '#EEC43C', 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    missedStyle: { 
        padding: 8, 
        width: 100, 
        elevation: 8,
        backgroundColor: '#f5365c', 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    cancelledStyle: { 
        padding: 8, 
        width: 100, 
        elevation: 8,
        backgroundColor: '#f5365c', 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    incompleteStyle: {
        padding: 8, 
        width: 100, 
        elevation: 8,
        backgroundColor: 'gray', 
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    },
    completedStyle: { 
        padding: 8, 
        width: 100, 
        backgroundColor: '#2dce89', 
        height: 60,
        justifyContent: 'center', 
        elevation: 8,
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderColor: '#27345C'
    }
});

// const AppContainer = createMaterialTopTabNavigator ({
//     Scheduled : {
//         screen: Scheduled,
//     },
//     Completed: {
//         screen: Completed,
//     },
//     Pending: {
//         screen: Pending,
//     },
//     Missed: {
//         screen: Missed,
//     },
//     Cancelled : {
//         screen: Cancelled,
//     }
// },
// {
//     lazy: true,
//     removeClippedSubviews: true,
//     animationEnabled: true,
//     optimizationsEnabled: true,
//     tabBarPosition: 'top',
//     swipeEnabled: true,
//     backBehavior: 'history',
//     tabBarOptions: {
//         scrollEnabled: true,
//         inactiveTintColor: 'gray',
//         activeTintColor: 'white',
//         elevation: 5,
//         style: {
//         backgroundColor: '#27345C',
//         height: (Platform.OS === 'ios') ? 48 : 70
//         },
//         labelStyle:{
//         fontSize: 10,
//         fontWeight: '400',
//         fontFamily: 'Montserrat-Black',
//         },
//         showIcon: true,
//         showLabel: true,
//         tabStyle: {

//         },
//         indicatorStyle: {
//         backgroundColor : 'transparent',
//         height : 0
//         },
//     },
// });

// const TabNavigationSetup = createAppContainer(AppContainer);

export default TabNavigationSetup;