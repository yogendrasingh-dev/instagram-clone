import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../../redux/actions';
import Ionic from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Search from './screens/Search';
import Activity from './screens/Activity';
import Profile from './screens/Profile';
import Reels from './screens/Reels';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 50,
          },

          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'ios-search-outline';
            } else if (route.name === 'Reels') {
              iconName = focused
                ? 'caret-forward-circle'
                : 'caret-forward-circle-outline';
            } else if (route.name === 'Activity') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
            }

            return <Ionic name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userState.currentUser,
});

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUser: () => dispatch(fetchUser),
//   };
// };

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
