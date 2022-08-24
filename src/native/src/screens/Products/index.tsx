import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './IProducts';
import styles from './styles';

const Products: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{"Welcome to Products"}</Text>
      
    </Animated.View>
  );
};

export default Products;
