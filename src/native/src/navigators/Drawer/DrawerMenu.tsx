import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Products from '../../screens/Products';
import MainCategory from '../../screens/Main Category';
import Categories from '../../screens/Categories';
import Brands from '../../screens/Brands';
import Offers from '../../screens/Offers';
import CustomDrawer from '../../components/CustomDrawer';
import { Colors } from '../../Constants/Color';
import { Icon } from 'react-native-elements';
import Home from '../../screens/Home';

// let screenStyle = null;

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
       drawerContent={props => <CustomDrawer {...props} />}
       
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -25,
        },
        headerStyle: {
          backgroundColor: Colors.tertiary,
        },
        headerTintColor: Colors.pink,
        drawerActiveBackgroundColor: Colors.tertiary,
        drawerActiveTintColor: Colors.pink,

        drawerType : "front"
      }}>

      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <Drawer.Screen
        name="Products"
        component={Products}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Main Category"
        component={MainCategory}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: ({ color, size }) => {
            return (
              <Icon name="home" size={size} color={color} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Brands"
        component={Brands}
        options={{
          drawerIcon: ({ color, size }) => {
            return (
              <Icon name="home" size={size} color={color} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Offers"
        component={Offers}
        options={{
          drawerIcon: ({ color, size }) => {
            return (
              <Icon name="local-offer" type='material-icons' size={size} color={color} />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
