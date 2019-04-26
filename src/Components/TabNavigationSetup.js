import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Missed from './Missed';
import { Platform } from 'react-native';
import Cancelled from './Cancelled';
import Pending from './Pending';
import Completed from './Completed';

const AppContainer = createMaterialTopTabNavigator ({
    Missed: {
        screen: Missed,
    },
    Pending: {
        screen: Pending,
    },
    Completed: {
        screen: Completed,
    },
    Cancelled : {
        screen: Cancelled,
    }
},
{
    lazy: true,
    removeClippedSubviews: true,
    animationEnabled: true,
    optimizationsEnabled: true,
    tabBarPosition: 'top',
    swipeEnabled: true,
    backBehavior: 'history',
    tabBarOptions: {
        inactiveTintColor: 'gray',
        activeTintColor: 'white',
        elevation: 5,
        style: {
        backgroundColor: '#27345C',
        height: (Platform.OS === 'ios') ? 48 : 70
        },
        labelStyle:{
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Montserrat-Black',
        },
        showIcon: true,
        showLabel: true,
        tabStyle: {

        },
        indicatorStyle: {
        backgroundColor : 'transparent',
        height : 0
        },
    },
});

const TabNavigationSetup = createAppContainer(AppContainer);

export default TabNavigationSetup;