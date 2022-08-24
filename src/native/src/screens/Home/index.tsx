import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {String} from '../../Constants/String';
import {Props} from './IHome';
import styles from './styles';

const Home: React.FC<Props> = ({navigation}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>{String.HOME_SCREEN}</Text>
    </Animated.View>
  );
};

export default Home;
