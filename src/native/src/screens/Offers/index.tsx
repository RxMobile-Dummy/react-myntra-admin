import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './IOffers';
import styles from './styles';

const Offers: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{"Welcome to Offers"}</Text>
    </Animated.View>
  );
};

export default Offers;
