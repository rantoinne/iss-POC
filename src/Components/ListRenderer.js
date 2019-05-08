import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

class ListRenderer extends Component {

    constructor(props) {
        super(props);
        this.state= {
            scaleMyX: new Animated.Value(0),
        };
        this.animateItem = new Animated.Value(0);
    }

    componentWillMount() {
        const { index } = this.props;
        // const delay = index * 100;
        Animated.timing(this.animateItem, {
            toValue: 1,
            duration: 200,
            delay: 50 + (index * 50),
            useNativeDriver: true
        }).start();

        if (this.props.refreshing === true) {
            this.animateItem.setValue(0);
            Animated.timing(this.animateItem, {
                toValue: 1,
                duration: 200,
                delay: 50 + (index * 50),
                useNativeDriver: true
            }).start();
        }
    }

    componentWillReceiveProps(props) {
        const { refreshing } = this.props;
        if(props.refreshing !== refreshing ) {
            alert('true')
        }
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

    render() {
        const { item, index } = this.props;
        
        return(
            <TouchableNativeFeedback
                    onPress= {() => this.props.scanTaskQR(index)}
                    background={TouchableNativeFeedback.Ripple('#27345C20')}>
                    <Animated.View style= {{
                        transform: [
                            {
                                translateY: this.animateItem.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [700, 1]
                                })
                            }
                        ]
                    }}>
                        <View style= {styles.listOuterStyle}>
                            <View>
                                <Text style={{color: 'black', fontFamily: 'Montserrat Bold', fontSize: 12, textAlign: 'left' }}>
                                    {item.ActivityName}
                                </Text>
                                <Text style={{ alignSelf: 'flex-start', color: 'black', fontFamily: 'Montserrat Light', fontSize: 12 }}>
                                    {item.ActivityCode}
                                </Text>
                                <Text style={{color: 'black', fontFamily: 'Montserrat Light', fontSize: 12, alignSelf: 'flex-start' }}>
                                    {item.AssetCode}
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
                                    onPress= {() => this.props.navigation.navigate('Scanner')}
                                    name= "qrcode-scan" color= "#30336b" size= {30} style= {{alignSelf: 'center', marginRight: 10}} /> 
                            </View>
                        </View>
                        </Animated.View>
                </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    listOuterStyle: {
        width, 
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        marginTop: 1, 
        borderBottomWidth: 1, 
        borderColor: '#bdc3c7', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    listOuterStyle1: {
        width, 
        borderColor: '#bdc3c7', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
});

export default withNavigation(ListRenderer);