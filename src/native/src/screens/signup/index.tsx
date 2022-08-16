import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {String} from '../../Constants/String';
import {Props} from './ISignUp';
import styles from './styles';

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = () => {
    navigation.navigate('HomeDash');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="SignUp" /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextField
              placeholder={String.FIRST_NAME}
              onTextChange={setFirstName}
            />
            <TextField
              placeholder={String.LAST_NAME}
              onTextChange={setLastName}
            />
            <TextField placeholder={String.EMAIL_ID} onTextChange={setEmail} />
            <TextField
              placeholder={String.PASSWORD}
              onTextChange={setPassword}
              isSecure={true}
            />
            <AppButton
              text={String.SIGN_UP}
              onPress={onSignUpPress}
              containerStyle={styles.signInBtn}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
