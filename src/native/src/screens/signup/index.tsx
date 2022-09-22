import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import { Props } from './ISignUp';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, normalize } from '../../utils/commonStyle';
import InputField from '../../components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button';

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState("")
  const [dob, setDOB] = useState("")
  const [country, setCountry] = useState("")
  const [fcmToken, setFCMToken] = useState("")
  const [deviceId, setDeviceId] = useState("")
  const [role, SetRole] = useState("")

  const onSignUpPress = (props: Props) => {
    navigation.navigate('HomeDash');
  };

  return (
    <LinearGradient colors={["#FEEDF6", "#FCEEE5"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* <Header title="SignUp" /> */}
        {/* <KeyboardAwareScrollView
           enableOnAndroid contentContainerStyle={{ flex: 1 }}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.subContainer}>
            <View style={styles.signUpContainer}>
              <KeyboardAwareScrollView
                enableOnAndroid contentContainerStyle={commonStyles.scrollviewContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.hdrTxt}>Signup</Text>
                </View>
                <View style={styles.box}>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      FirstName
                    </Text>
                    <InputField
                      value={firstName}
                      onChange={(firstName: any) => setFirstName(firstName)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter FirstName"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Email
                    </Text>
                    <InputField
                      value={email}
                      onChange={(email: any) => setEmail(email)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter Email"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Mobile No
                    </Text>
                    <InputField
                      value={mobileNo}
                      onChange={(mobileNo: any) => setMobileNo(mobileNo)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter MobileNo"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Password
                    </Text>
                    <InputField
                      value={password}
                      onChange={(password: any) => setPassword(password)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter Password"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      DOB
                    </Text>
                    <InputField
                      value={dob}
                      onChange={(dob: any) => setDOB(dob)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter Email"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Country
                    </Text>
                    <InputField
                      value={country}
                      onChange={(country: any) => setCountry(country)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter Email"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Role
                    </Text>
                    <InputField
                      value={role}
                      onChange={(role: any) => SetRole(role)}
                      top={10}
                      isMultiline={false}
                      placeholder="Enter Email"
                      placeholderColor={"grey"}
                      isProduct={false}
                    />
                  </View>
                  <View style={{marginTop : normalize(20), marginBottom : normalize(20)}}>
                  <Button
                    height={normalize(45)}
                    onPress={() => onSignUpPress()}
                    bgColor="#ff3f6c"
                    children={
                      <View style={styles.lgContainer}>
                        <Text style={styles.lg}>Signup</Text>
                      </View>
                    }
                />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    </LinearGradient>
  );
};
export default SignUpScreen;
