import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgetBlue',
    justifyContent: 'center',
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  signUpContainer: {
    backgroundColor: Colors.white,
    paddingTop: normalize(15),
    width: "100%",
    height: Dimensions.get("screen").height / 1.2,
    // marginTop : "10%"
  },
  hdrTxt: {
    fontSize: normalize(18),
    color: Colors.pink,
    fontWeight: "600"
  },
  box: {
    width: "90%",
    alignSelf: "center",
  },
  elContainer : {
    marginTop: normalize(15),
    height: normalize(65)
  },
  elTxt : {
    fontSize: normalize(14),
    color: "#585757"
  },
  lgContainer : {
    alignItems: "center",
    justifyContent: "center",
    height: normalize(45)
  },
  lg : { fontSize: normalize(14), color: "#fff" }
});
export default styles;
