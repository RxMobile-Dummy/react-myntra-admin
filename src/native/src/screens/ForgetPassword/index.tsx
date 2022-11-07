import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Image, Alert} from 'react-native';
import InputField from '../../components/InputField';
import {styles} from './ForgetPasswordStyle';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import {normalize} from '../../utils/commonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { emailValidation, ForgotPassword, RootState } from 'core';
import showToast from '../../components/Toast';
import Loader from '../../components/Loader';
import { IForgetPassword } from './IForgetPassword';

const ForgetPasswordScreen = (props : IForgetPassword) => {
  const dispatch = useDispatch()

  let { data, error } = useSelector(
    (state: RootState) => state.forgotPasswordReducer
  );

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const onForgetPassword = async () => {
    setIsLoading(true)
    if(emailValidation(email)){
      showToast({type : "error", message : emailValidation(email)})
      setIsLoading(false)
      return
    }
    else{
      let forgetReq = {
        email : email,
        role : "admin"
      }
    let forgetResponse =  await dispatch<any>(ForgotPassword(forgetReq));
    console.log("Forget response is",forgetResponse)
    if(forgetResponse.status){
      setIsLoading(false)
      showToast({type : "success", message : "OTP sent on your email address"})
      props.navigation.navigate("ChangePassword",{
        email : email
      })
    }
    else{
      setIsLoading(false)
      showToast({type : "error", message : forgetResponse.resultData})
    }
    }
  }

  return (
    <LinearGradient colors={['#FEEDF6', '#FCEEE5']} style={{flex: 1}}>
      {
        isLoading && <Loader/>
      }
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{flex: 1}}
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
            <View style={styles.box}>
              <View style={styles.elContainer}>
                <Text style={styles.elTxt}>Email</Text>
                <InputField
                  value={email}
                  onChange={(email: any) => setEmail(email)}
                  top={10}
                />
              </View>
              {/* Add button */}
              <View style={styles.top}>
                <Button
                  height={normalize(45)}
                  onPress={() => onForgetPassword()}
                  bgColor="#ff3f6c"
                  children={
                    <View style={styles.lgContainer}>
                      <Text style={{...styles.lg, fontWeight: 'bold'}}>
                        Continue
                      </Text>
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

export default ForgetPasswordScreen;
