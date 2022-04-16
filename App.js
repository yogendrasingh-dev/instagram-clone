import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import * as firebase from './firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/components/auth/Landing';
import RegisterScreen from './src/components/auth/Register';
import LoginScreen from './src/components/auth/Login';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import MainScreen from './src/components/Main';
import Status from './src/components/screenComponents/Status';
import FriendProfile from './src/components/screenComponents/FriendProfile';
import EditProfile from './src/components/screenComponents/EditProfile';
const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createNativeStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({loggedIn: false, loaded: true});
      } else {
        this.setState({loggedIn: true, loaded: false});
      }
    });

    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if (loaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Status" component={Status} />
            <Stack.Screen name="FriendProfile" component={FriendProfile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
