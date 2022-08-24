import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './IMainCategory';
import styles from './styles';

const MainCategory: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{"Welcome to Main Categories"}</Text>
    </Animated.View>
  );
};

export default MainCategory;
