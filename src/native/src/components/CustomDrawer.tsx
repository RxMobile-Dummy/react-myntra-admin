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

const CustomDrawer = props => {
  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.conContainer}>
        <View style={styles.imgBg}>
          <Image source={Images.UserProfile} style={styles.profile} />
          <Text style={styles.userName}>Dhaval Patel</Text>
        </View>
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareBtn}>
          <View style={styles.shareView}>
            {/* <Ionicons
              name="share-social-outline"
              size={22}
              color={Colors.grayDark}
            /> */}
            <Icon name="home" size={22} color={Colors.grayDark} />
            <Text style={styles.shareText}>Tell a friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <View style={styles.shareView}>
            {/* <Ionicons name="exit-outline" size={22} color={Colors.grayDark} /> */}
            <Icon name="home" size={22} color={Colors.grayDark} />
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
