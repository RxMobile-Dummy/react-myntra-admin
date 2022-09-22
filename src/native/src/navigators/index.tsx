import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import LoginScreen from '../screens/login';
import SignUpScreen from '../screens/signup';
import {RootStackParamList} from './RootStackParamList';

import Splash from '../screens/Splash';
import Home from '../screens/Home';
import DrawerMenu from './Drawer/DrawerMenu';
import {Colors} from '../Constants/Color';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false, headerStyle : {backgroundColor : Colors.tertiary}}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="HomeDash"
        component={DrawerMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
