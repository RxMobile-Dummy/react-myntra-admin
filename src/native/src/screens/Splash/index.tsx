import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import {Images} from '../../../assets/images';
import {String} from '../../Constants/String';
import {Props} from './ISplash';
import styles from './styles';

const Splash: React.FC<Props> = ({navigation}) => {

  useEffect(() => {
    navigation.navigate("Login")
  })

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={Images.Welcome}
          resizeMode="contain"
          style={styles.welcomeImg}
        />

      </View>
    </SafeAreaView>
  );
};

export default Splash;
