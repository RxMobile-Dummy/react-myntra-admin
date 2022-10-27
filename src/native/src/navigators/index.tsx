import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import SignUpScreen from '../screens/signup';
import {RootStackParamList} from './RootStackParamList';

import Home from '../screens/Home';
import DrawerMenu from './Drawer/DrawerMenu';
import {Colors} from '../Constants/Color';
import ForgetPasswordScreen from '../screens/ForgetPassword';
import ChangePassword from '../screens/ChangePassword';
import { useSelector } from 'react-redux';
import { RootState } from 'core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { loginData, error, token } = useSelector((state: RootState) => state.auth);
  const [tokenResult, setTokenResult] = useState("")
  console.log("Token", token)

if(token){
  return(
    <Stack.Navigator screenOptions={{headerShown : false, headerStyle : {backgroundColor : Colors.tertiary}}}>
        <Stack.Screen
        name="HomeDash"
        component={DrawerMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
  return (
    <Stack.Navigator screenOptions={{headerShown : false, headerStyle : {backgroundColor : Colors.tertiary}}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name = "ChangePassword" component={ChangePassword} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
