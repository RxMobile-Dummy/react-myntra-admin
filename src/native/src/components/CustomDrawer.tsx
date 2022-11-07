import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

//import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../assets/images';
import {Colors} from '../Constants/Color';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedIn, LogoutAdmin, RootState } from 'core';
import showToast from './Toast';

const CustomDrawer = (props : any) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth);

  const onSignout = async () => {
    let logoutRequest = {
      adminId : user._id,
      authToken : user.token,
      // authToken : user.token
    }
    let logoutResponse = await dispatch<any>(LogoutAdmin(logoutRequest))
    console.log("Logout is", logoutResponse)
    if(logoutResponse.status){
      showToast({type : "success", message : "Admin logout successfully"})
      dispatch<any>(isLoggedIn(false))
      await AsyncStorage.setItem("token", "")
   }
  }

  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.conContainer}>
        <View style={styles.imgBg}>
          <Image source={Images.UserProfile} style={styles.profile} />
          <Text style={styles.userName}>{user.fullName}</Text>
        </View>
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => onSignout()} style={styles.shareBtn}>
          <View style={styles.shareView}>
            {/* <Ionicons name="exit-outline" size={22} color={Colors.grayDark} /> */}
            {/* <Icon name="home" size={22} color={Colors.grayDark} tvParallaxProperties={undefined} /> */}
            <Text style={styles.shareText}>Signout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  conContainer: {
    backgroundColor: Colors.tertiary,
  },
  imgBg: {
    padding: 20,
    backgroundColor: Colors.tertiary,
  },
  profile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: Colors.pink,
  },
  drawerItem: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  bottomBar: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },
  shareBtn: {
    paddingVertical: 15,
  },
  shareView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export default CustomDrawer;
