import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Dimensions
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;

class Application extends Component {

  static navigationOptions= {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidMount() {
		AsyncStorage.getItem('authToken').then((value) => {
			if(value!== null) {
                let that = this;

                setTimeout(() => {
                that.props.navigation.navigate('ProfileScreen');
                }, 2000);
			  
			}
			else {
                let that = this;

                setTimeout(() => {
                that.props.navigation.navigate('LoginScreen');
                }, 2000);
            }
    });
	}

  render() {
    // const { errorMessage, popupShowed } = this.state;

    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#162D5C" animated barStyle="light-content" />
        <LinearGradient 
          colors={['#162D5C', '#30336b']}
          style= {{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          <ActivityIndicator size= {40} color="#dcdde1" style= {{alignSelf: 'center'}} />

          <Text style= {{color: 'white', fontSize: 24, alignSelf: 'center', fontFamily: 'Montserrat Italic', marginTop: 40}}>
            Please wait...
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  heading: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5,
  },
  subheading: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  fingerprint: {
    padding: 20,
    marginVertical: 30,
  },
  errorMessage: {
    color: '#ea3d13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
  popup: {
    width: width * 0.8,
  }
});

export default Application;