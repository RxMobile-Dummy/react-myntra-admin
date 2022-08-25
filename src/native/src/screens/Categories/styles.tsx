import { StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  center: {
    alignSelf: "center",
    width: "92%",
    marginTop: normalize(20)
  },

  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  btnTxt: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "800",
    paddingLeft: 10
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  icon: {
    marginRight: 5,
  },
  
  placeholderStyle: {
    fontSize: 16,
  },
  
  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  ctTxt : { 
    fontSize: 16, 
    marginTop: normalize(15), 
    color: Colors.grayDark, 
    fontWeight: "700" 
  },

  touchContainer : { 
    width: "100%", 
    height: normalize(45), 
    borderWidth: .6, 
    borderRadius: normalize(6), 
    borderColor: Colors.grayDark, 
    marginTop: normalize(8), 
    alignItems: "center", 
    paddingLeft: normalize(10), 
    flexDirection: "row" 
  },

  iconDown : { 
    position: "absolute", 
    right: 10 
  },

  tbHeader : { 
    marginTop: normalize(15), 
    width: "100%", 
    backgroundColor: Colors.black, 
    flexDirection: "row", 
    height: normalize(45), 
    borderTopLeftRadius: normalize(6), 
    borderTopRightRadius: normalize(6) 
  },

  tbCol1 : { 
    width: "20%", 
    justifyContent: "center", 
    alignItems: "center", 
  },

  tbDetail : { 
    fontSize: normalize(14), 
    color: Colors.white, 
    fontWeight: "800" 
  },

  line : { 
    height: normalize(45), 
    width: .4, 
    backgroundColor: Colors.graylight 
  },

  tbCol2 : { 
    width: "40%", 
    justifyContent: "center", 
    alignItems: "center", 
  },

  subTb : { 
    width: "100%", 
    backgroundColor: Colors.white, 
    borderColor: Colors.grayDark, 
    borderBottomWidth: .8, 
    borderLeftWidth: .8, 
    borderRightWidth: .8, 
    flexDirection: "row", 
    height: normalize(45) 
  },

  subTbDetail : { 
    fontSize: normalize(14), 
    color: Colors.black, 
    fontWeight: "800" 
  },

  subLine : { 
    height: normalize(45), 
    width: .4, 
    backgroundColor: Colors.black 
  },

  mnTxt : { 
    fontSize: normalize(14), 
    color: Colors.black,  
  },

  smContainer : { 
    height: normalize(250), 
    backgroundColor: Colors.white, 
    width: "92%", 
    alignSelf: "center", 
    borderRadius: normalize(6), 
    padding: normalize(15) 
  },

  liTxt : { 
    fontSize: normalize(16), 
    color: Colors.grayDark, 
    fontWeight: "bold", 
    marginBottom: normalize(15) 
  },

  smTouch : { 
    width: "100%", 
    justifyContent: "center", 
    height: normalize(30), 
  },

  title : { 
    fontSize: normalize(14), 
    color: Colors.grayDark 
  },

  sm2Container : {
    height: normalize(300), 
    width: "92%", 
    alignSelf: "center", 
    backgroundColor: Colors.white, 
    borderRadius: normalize(6) 
  },

  sm2Sub : { 
    height: normalize(50), 
    backgroundColor: Colors.pink, 
    justifyContent: "center", 
    paddingLeft: "5%" 
  },

  sm2Txt : { 
    fontSize: normalize(14), 
    color: Colors.white, 
    fontWeight: "700" 
  },

  sm2 : { 
    width: "90%", 
    alignSelf: "center", 
    marginTop: normalize(12) 
  },

  sm2Menu : { 
    width: "90%", 
    height: normalize(160), 
    marginLeft: normalize(15), 
    marginTop: normalize(35) 
  },

  menu : { 
    width: "100%", 
    height: normalize(45), 
    borderWidth: .6, 
    borderRadius: normalize(6), 
    borderColor: Colors.grayDark, 
    marginTop: normalize(8), 
    alignItems: "center", 
    paddingLeft: normalize(10), 
    flexDirection: "row" 
  },

  smCenter : { 
    justifyContent: "center", 
    padding: normalize(10), 
  },

  bottom : { 
    position: "absolute", 
    bottom: normalize(15), 
    right: normalize(5), 
    flexDirection: "row" 
  },

  close : { 
    width: normalize(80), 
    height: normalize(35), 
    backgroundColor: "#6c757d", 
    borderRadius: normalize(4), 
    justifyContent: "center", 
    alignItems: "center" 
  },

  closeTxt : { 
    fontSize: normalize(14), 
    color: Colors.white 
  },

  save : { 
    marginLeft: normalize(15), 
    width: normalize(130), 
    height: normalize(35), 
    backgroundColor: Colors.pink, 
    borderRadius: normalize(4), 
    justifyContent: "center", 
    alignItems: "center" 
  }
})

export default styles;