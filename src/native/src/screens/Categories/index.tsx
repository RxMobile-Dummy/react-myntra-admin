import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './ICategories';
import styles from './styles';

const Categories: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{"Welcome to Categories"}</Text>
    </Animated.View>
  );
};

export default Categories;
