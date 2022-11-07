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
import { isEmail, isEmpty, isLoggedIn, Login, Register, RootState, userData,  } from 'core';
import Toast from 'react-native-toast-message'
import showToast from '../../components/Toast';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<Props> = (props : any) => {

  const dispatch = useDispatch()
  //const state = useSelector()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const state = useSelector((state: RootState) => state.auth.registerData);
  const { loginData, error, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("Toekekekeke", token)
  }, [token, loginData]);

  const onLoginPress = async () => {
    setIsLoading(true)
    console.log("Login response in",)

    if(isEmpty(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter email address"
      })
      setIsLoading(false)
    }
    else if(!isEmail(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter valid email address"
      })
      setIsLoading(false)
    }
    else if(isEmpty(password)){
      Toast.show({
        type : "error",
        text1 : "Please enter password"
      })
      setIsLoading(false)
    }
    else{
      var loginVariables = {
        email : email,
        password : password,
        fcmToken : "",
        deviceId : "",
        role : "admin",
      }
      let loginResponse =  await dispatch<any>(Login(loginVariables))
    if(loginResponse.status){
      showToast({type : "success", message : "Admin user login successfully"})
      setIsLoading(false)
      dispatch<any>(isLoggedIn(true))
      dispatch<any>(userData(loginResponse.data))
      await AsyncStorage.setItem("token",loginResponse.data.token)
      props.navigation.navigate("HomeDash")
    }
    else{
      showToast({type : "error", message : loginResponse.data})
      setIsLoading(false)
    }
    }
  };



  return (
    <LinearGradient colors={['#FEEDF6', '#FCEEE5']} style={{flex: 1}}>
      {
         isLoading && <Loader/>
      }
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{flex: 1, width: '100%'}}
      >
        <View style={styles.subContainer}>
          <Image
            source={{
              uri: 'https://constant.myntassets.com/pwa/assets/img/banner_login_landing_300.jpg',
            }}
            style={styles.img}
            resizeMode="cover"
          />
          <View style={styles.header}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.lgTxt}>Login</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>Email</Text>
                <InputField
                  value={email}
                  onChange={(email: any) => setEmail(email)}
                  top={10}
                />
              </View>

              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>Pasword</Text>
                <InputField
                  value={password}
                  onChange={(email: any) => setPassword(email)}
                  top={10}
                />
              </View>
              <View style={styles.footer}>
                <Text style={styles.txt}>
                  By Continuing, I agree to the
                  <Text style={styles.subTxt}>{'  '}Terms of</Text>
                </Text>
                <Text style={styles.subTxt}>
                  Usage <Text style={styles.txt}> &</Text>
                  <Text style={styles.subTxt}>{'  '}Privcay Policy</Text>
                </Text>
              </View>
              {/* Add button */}
              <View style={styles.top}>
                <Button
                  height={normalize(45)}
                   onPress={() => onLoginPress()}
                  bgColor="#ff3f6c"
                  children={
                    <View style={styles.lgContainer}>
                      <Text style={{...styles.lg, fontWeight: 'bold'}}>
                        Login
                      </Text>
                    </View>
                  }
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={{justifyContent : "center"}}>
              <Text style={styles.bottomTxt}>
                Don't have an account?{' '}
                  <Text onPress={() => props.navigation.navigate("SignUp")} style={styles.boldTxt}>Register</Text>
              </Text>
              </View>

              <Text
                style={{
                  ...styles.bottomTxt,
                  paddingTop: normalize(5),
                }}
              >
                Forget Password?{' '}
                {/* <TouchableOpacity onPress={onForgotPasswordClick}> */}
                  <Text
                     onPress={() => props.navigation.navigate("ForgetPassword")}
                    style={{
                      ...styles.boldTxt,
                      paddingTop: normalize(5),
                    }}
                  >
                    Change Password
                  </Text>
                {/* </TouchableOpacity> */}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};
export default LoginScreen;
