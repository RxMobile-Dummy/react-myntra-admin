import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './IBrands';
import styles from './styles';

const Brands: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{"Welcome to Brand"}</Text>
    </Animated.View>
  );
};

export default Brands;
