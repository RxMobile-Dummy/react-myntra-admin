import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import Favorite from '../../screens/Favorite';
import Cart from '../../screens/Cart';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../Constants/Color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.tertiary,
        },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="home-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={Favorite}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="shopping-bag" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={Cart}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="heart-outline" color={color} size={size} />;
          },
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: Colors.gold,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
