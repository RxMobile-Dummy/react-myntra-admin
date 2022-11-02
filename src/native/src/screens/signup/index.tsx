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
import { contactNumberValidation, dobValidation, isEmail, isEmpty, isLoggedIn, isPhone, passwordValidation, Register, RootState, userData } from 'core';
import Toast from 'react-native-toast-message';
import showToast from '../../components/Toast';
import Loader from '../../components/Loader';
import { Colors } from '../../Constants/Color';

const genderList = [
  {
    name : "Male"
  },
  {
    name : "Female"
  },
  {
    name : "Others"
  }
]

const SignUpScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState("")
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
  const [isLoading, setIsLoading] = useState(false)
  const [gender,setGender] = useState("")


  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

    const state = useSelector((state: RootState) => state.auth.registerData);

  const onSignUpPress = async() => {
    setIsLoading(true)
    let select_date = moment(date).format("YYYY-MM-DD")
    if(isEmpty(firstName)){
      Toast.show({
        type : "error",
        text1 : "Please enter first name"
      })
      setIsLoading(false)
    }
    else if(!isEmail(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter your valid email address"
      })
      setIsLoading(false)
    }
    else if(isEmpty(email)){
      Toast.show({
        type : "error",
        text1 : "Please enter valid email address"
      })
      setIsLoading(false)
    }
    else if(contactNumberValidation(mobileNo)){
     showToast({type : "error", message : contactNumberValidation(mobileNo)})
     setIsLoading(false)
    }
    else if(isEmpty(gender)){
      showToast({type : "error", message : "Please choose your gender"})
      setIsLoading(false)
    }
    else if(dobValidation(select_date)){
    showToast({type : "error", message : dobValidation(select_date)})
    setIsLoading(false)
    }
    else if(passwordValidation(password)){
      showToast({type : "error", message : passwordValidation(password)})
      setIsLoading(false)
    }
    else{
      var variable = {
        fullName: firstName,
        email: email,
        mobileNo: mobileNo,
        gender: gender,
        dob: select_date,
        country:country == undefined ? "India" : country.name,
        password: password,
        isVerified: false,
        fcmToken: "",
        deviceId: "",
        platform: Platform.OS,
        role : "admin"
      }
      console.log("Variables", variable)
     let registerResponse = await dispatch<any>(Register(variable))
     if(registerResponse.status){
      showToast({type : "success", message : "Admin user register successfully"})
      setIsLoading(false)
      dispatch<any>(isLoggedIn(true))
      dispatch<any>(userData(registerResponse.resultData))
      navigation.navigate("HomeDash")
      return
     }
     else{
      showToast({type : "error", message : "Something went wrong"})
      setIsLoading(false)
     }

    }
  };

  useEffect(() => {
    // console.log("Value of data is",state)
  },[])

 const onGender = (name : string) => {
  setGender(name)
 }

  return (
    <LinearGradient colors={["#FEEDF6", "#FCEEE5"]} style={{ flex: 1 }}>
      {
        isLoading && <Loader/>
      }
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
                  <View style={{ width: "80%", marginTop: normalize(15),  }}>
                      <Text style={{ fontSize: normalize(14), color: Colors.black }}>Gender</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginRight :normalize(10)}}>
                        {
                          genderList.map((item, index) => (
                            <>
                              <TouchableOpacity key={"Gender_" + index} onPress={() => onGender(item.name)} style={{ width: normalize(20), height: normalize(20), borderRadius: normalize(20), marginTop: normalize(8), borderColor: item.name == gender ? Colors.pink : Colors.grey, borderWidth: 1, justifyContent : "center", alignItems : "center" }}>
                             {
                              item.name == gender && <View style={{width : normalize(10), height : normalize(10), borderRadius : normalize(10), backgroundColor : Colors.pink}} />
                             }

                              </TouchableOpacity>
                              <Text style={{ paddingTop: normalize(8), paddingLeft: normalize(6), marginRight : normalize(15),fontSize: normalize(12), color: Colors.black }}>{item.name}</Text>
                            </>
                          ))
                        }

                      </View>
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
