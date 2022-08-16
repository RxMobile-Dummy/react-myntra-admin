import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {String} from '../../Constants/String';
// import Logo from '../../components/Logo/Logo';
import styles from './styles';

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const onLoginPress = () => {
    navigation.navigate('Login');
  };
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Logo /> */}
      <View style={styles.btnView}>
        <AppButton
          text={String.SIGN_IN}
          onPress={onLoginPress}
          containerStyle={styles.signInBtn}
        />
        <AppButton
          text={String.SIGN_UP}
          onPress={onSignUpPress}
          containerStyle={styles.signUpBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
