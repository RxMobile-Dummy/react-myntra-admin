import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { Props } from './ISignUp';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, normalize } from '../../utils/commonStyle';
import InputField from '../../components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from "./ISignUp"
import moment from "moment"
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isEmpty, isPhone, Register, REGISTER, RootState } from 'core';
import Toast from 'react-native-toast-message';

const SignUpScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState("")
  const [role, SetRole] = useState("")
  const [countryCode, setCountryCode] = useState<CountryCode>('IN')
  const [country, setCountry] = useState<Country>()
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
    false,
  )
  const [withFlag, setWithFlag] = useState<boolean>(true)
  const [withEmoji, setWithEmoji] = useState<boolean>(true)
  const [withFilter, setWithFilter] = useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false)
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false)


  const [date, setDate] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)


  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

    const state = useSelector((state: RootState) => state.auth.registerData);
   // console.log("State is", state)

  const onSignUpPress = async() => {
    let select_date = moment(date).format("YYYY-MM-DD")
    let countryData =   JSON.stringify(country)
    if(isEmpty(firstName)){
      Toast.show({
        type : "error",
        text1 : "Please enter first name"
      })
    }
    else if(!isEmail(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter your valid email address"
      })
    }
    else if(isEmpty(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter valid email address"
      })
    }
    else if(isEmpty(mobileNo)){
      Toast.show({
        type : "error",
        text1 : "Please enter your mobile number"
      })
    }
    // else if(isPhone(mobileNo)){
    //   Toast.show({

    //   })
    // }
    else if(isEmpty(select_date)){
      Toast.show({
        type : "error",
        text1 : "Please select DOB"
      })
    }
    else if(isEmpty(password)){
      Toast.show({
        type : "error",
        text1 : "Please enter password"
      })
    }
    else{
      var variable = {
        "fullName": firstName,
        "email": email,
        "mobileNo": mobileNo,
        "gender": "Male",
        "dob": select_date,
        "country": country == undefined ? "India" : country,
        "password": password,
        "role": role,
        "isVerified": false,
        "fcmToken": "",
        "deviceId": "",
        "platform": Platform.OS,
      }
      console.log("Variables", variable)
     let data = await dispatch<any>(Register(REGISTER, variable))
     console.log("Value of data is",state)
    }
  };

  useEffect(() => {
    console.log("Value of data is",state)
  },[state])

  return (
    <LinearGradient colors={["#FEEDF6", "#FCEEE5"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
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
                    <TouchableOpacity onPress={() => setOpen(true)} style={{ width: "100%", height: normalize(40), borderWidth: .6, borderColor: "#585757", borderRadius: normalize(4), marginTop: 10, justifyContent: "center", paddingLeft: normalize(10) }}>
                      <Text style={{ fontSize: normalize(15), }}>{moment(date).format("YYYY-MM-DD")}</Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open}
                      mode="date"
                      date={date}
                      onConfirm={(date) => {
                         let select_date = moment(date).format("YYYY-MM-DD")
                        var month = date.getUTCMonth() + 1; //months from 1-12
                        var day = date.getUTCDate();
                        var year = date.getUTCFullYear();
                       var newdate = year + "-" + month + "-" + day;
                        console.log("Value of date is", select_date)
                        setOpen(false)
                        setDate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </View>
                  <View style={styles.elContainer}>
                    <Text style={styles.elTxt}>
                      Country
                    </Text>
                    <TouchableOpacity style={{ width: "100%", height: normalize(40), borderWidth: .6, borderColor: "#585757", borderRadius: normalize(4), marginTop: 10, justifyContent: "center", paddingLeft: normalize(10) }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <CountryPicker
                          {...{
                            countryCode,
                            withFilter,
                            withFlag,
                            withCountryNameButton,
                            withAlphaFilter,
                            withCallingCode,
                            withEmoji,
                            onSelect,
                          }}
                        />
                        {country !== null && (
                          <Text style={{ fontSize: normalize(15),  }}>{ country == undefined ? "India" : JSON.stringify(country?.name).slice(1,country.name.length - 1)}</Text>
                        )}
                      </View>
                    </TouchableOpacity>
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
                  <View style={{ marginTop: normalize(20), marginBottom: normalize(20) }}>
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
