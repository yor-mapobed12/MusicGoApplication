import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useColorScheme} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import MainScreen from './source/screens/MainScreen';
import ProfileScreen from './source/screens/ProfileScreen';
import MusicTrackerScreen from './source/screens/MusicTrackerScreen';
import MusicPlayer from './source/components/MusicTracker/MusicPlayer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const RootNavigator = () => {
    const BottomTabs = () => {
      return (
        <Tab.Navigator
          initialRouteName="MainScreen"
          screenOptions={() => ({
            tabBarShowLabel: false,
            tabBarStyle: {display: 'none', keyboardHidesTabBar: false},
            
          })}>
          <Tab.Screen
            name="MainScreen"
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            component={MainScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            name="MusicTrackerScreen"
            component={MusicTrackerScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            name="ProfileScreen"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      );
    };

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MusicPlayer"
          component={MusicPlayer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
