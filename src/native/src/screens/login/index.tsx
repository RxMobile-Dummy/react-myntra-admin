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

//import {ApplicationState, onLogin} from '../../Redux';
import { Props } from './ILogin';
import { PostApi } from '../../Network/ApiCall';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, normalize } from '../../utils/commonStyle';
import InputField from '../../components/InputField';
import Button from '../../components/Button';


const LoginScreen: React.FC<Props> = (props) => {

  const [inEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSigninInProgress, setSignInInProgress] = useState(false);


  //const dispatch = useDispatch();

  // const {user, error} = useSelector(
  //   (state: ApplicationState) => state.loginReducer,
  // );

  // const {token} = user;

  // console.log('token ::', token);
  // console.log('error ::', error);

  useEffect(() => {
    // if (token !== undefined) {
    //   navigation.navigate('Home');
    // }
    //do nothing
  }, []);


  const onLoginPress = async () => {
    // navigation.navigate('HomeDash');
    const paramData = {
      email: inEmail,
      password: password,
    };
    props.navigation.navigate("HomeDash")
    // const data = await PostApi('mock-login', paramData);
    // console.log('data :::', data);
    // onTapLogin();
  };

  return (

    <LinearGradient colors={["#FEEDF6", "#FCEEE5"]} style={{ flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, width: "90%", alignSelf: "center" }} >
          <Image source={{ uri: "https://constant.myntassets.com/pwa/assets/img/banner_login_landing_300.jpg" }} style={{ height: normalize(105), width: "100%" }} resizeMode="cover" />
          <View style={{ backgroundColor: "#FFF", paddingTop: normalize(15), width: "100%", height: normalize(350) }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: normalize(18), color: "#ff3f6c", fontWeight: "600" }}>Login</Text>
            </View>
            <View style={{ width: "90%", alignSelf: "center", }}>

              <View style={{ marginTop: normalize(15), height: normalize(65) }}>
                <Text style={{ fontSize: normalize(14), color: "#585757" }}>
                  Email
                </Text>
                <InputField
                  value={inEmail}
                  onChange={(email : any) => setEmail(email)}
                  top={10}
                  isPassword={false}
                  showPassord={false}
                />
              </View>

              <View style={{ marginTop: normalize(20), height: normalize(65) }}>
                <Text style={{ fontSize: normalize(14), color: "#585757" }}>
                  Pasword
                </Text>
                <InputField
                  value={password}
                  onChange={(email : any) => setPassword(email)}
                  top={0}
                  isPassword={false}
                  showPassord={false}
                />
              </View>

              <View style={{ marginTop: normalize(20), paddingLeft: normalize(5) }}>
                <Text style={{ fontSize: normalize(14), color: "#585757" }}>By Continuing, I agree to the<Text style={{ fontSize: normalize(14), color: "#ff3f6c", fontWeight: "800" }}>{"  "}Terms of</Text></Text>
                <Text style={{ fontSize: normalize(14), color: "#ff3f6c", fontWeight: "800" }}>Usage <Text style={{ fontSize: normalize(14), color: "#585757" }}>{" "}&</Text><Text style={{ fontSize: normalize(14), color: "#ff3f6c", fontWeight: "800" }}>{"  "}Privcay Policy</Text></Text>
              </View>
              {/* Add button */}
              <View style={{ marginTop: normalize(20) }}>
                <Button
                  height={normalize(45)}
                  onPress = {() => onLoginPress()}
                  bgColor="#ff3f6c"
                  children={
                    <View style={{ alignItems: "center", justifyContent: "center", height: normalize(45) }}>
                      <Text style={{ fontSize: normalize(14), color: "#fff" }}>Login</Text>
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
