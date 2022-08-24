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
import { PostApi } from '../../../../core/lib/Network/ApiCall';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, normalize } from '../../utils/commonStyle';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { login } from "path-redux/lib/store/actionCreator/loginActionCretor"
import { RootState } from "path-redux/lib/store/reducer/index"

const LoginScreen: React.FC<Props> = (props) => {

  const dispatch = useDispatch()

  const [inEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninInProgress, setSignInInProgress] = useState(false);

  useEffect(() => {
    dispatch(login())
  }, []);

  const state = useSelector((state: RootState) => state.auth);

  const onLoginPress = async () => {
    console.log("Value of all data is", state)
    const paramData = {
      email: inEmail,
      password: password,
    };
    // dispatch(login(paramData))
    props.navigation.navigate("HomeDash")
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
                  value={inEmail}
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
