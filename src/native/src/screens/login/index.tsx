import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector, useDispatch } from 'react-redux';
import { Props } from './ILogin';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, normalize } from '../../utils/commonStyle';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { isEmail, isEmpty, LOGIN, Login, Register, RootState,  } from 'core';
import Toast from 'react-native-toast-message'

const LoginScreen: React.FC<Props> = (props) => {

  const dispatch = useDispatch()
  //const state = useSelector()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("")

  const state = useSelector((state: RootState) => state.auth.registerData);

  useEffect(() => {
  }, [state]);

  const onLoginPress = async () => {
    if(isEmpty(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter email address"
      })
    }
    else if(!isEmail(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter valid email address"
      })
    }
    else if(isEmpty(password)){
      Toast.show({
        type : "error",
        text1 : "Please enter password"
      })
    }
    else{
      var loginVariables = {
        email : email,
        password : password,
        fcmToken : "",
        deviceId : "",
        role : role,
      }
      await dispatch<any>(Login(LOGIN,loginVariables))
    }
  };



  return (
    <LinearGradient colors={["#FEEDF6", "#FCEEE5"]} style={{ flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ flex: 1 }}>
        <View style={styles.subContainer} >
          <Image source={{ uri: "https://constant.myntassets.com/pwa/assets/img/banner_login_landing_300.jpg" }} style={styles.img} resizeMode="cover" />
          <View style={styles.header}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.lgTxt}>Login</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>
                  Email
                </Text>
                <InputField
                  value={email}
                  onChange={(email: any) => setEmail(email)}
                  top={10}
                />
              </View>

              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>
                  Pasword
                </Text>
                <InputField
                  value={password}
                  onChange={(email: any) => setPassword(email)}
                  top={10}
                />
              </View>

              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>
                  Role
                </Text>
                <InputField
                  value={role}
                  onChange={(role: any) => setRole(role)}
                  top={10}
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.txt}>By Continuing, I agree to the<Text style={styles.subTxt}>{"  "}Terms of</Text></Text>
                <Text style={styles.subTxt}>Usage <Text style={styles.txt}>{" "}&</Text><Text style={styles.subTxt}>{"  "}Privcay Policy</Text></Text>
              </View>
              {/* Add button */}
              <View style={styles.top}>
                <Button
                  height={normalize(45)}
                  onPress={() => onLoginPress()}
                  bgColor="#ff3f6c"
                  children={
                    <View style={styles.lgContainer}>
                      <Text style={styles.lg}>Login</Text>
                    </View>
                  }
                />
              </View>
            </View>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};
export default LoginScreen;
