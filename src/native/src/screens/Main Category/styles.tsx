import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
 center : {
   alignSelf : "center",
   width : "92%",
   marginTop : normalize(20)
 },
 btnContainer : {
   flexDirection : "row",
   alignItems : "center",
   justifyContent : "center",
   flex : 1
  },
btnTxt : {
  fontSize: 14,
  color: Colors.white,
  fontWeight: "800",
  paddingLeft: 10
},
 ctTxt : {
    fontSize: 16,
    marginTop: normalize(20),
    color: Colors.grayDark,
    fontWeight: "700"
  },
header : {
  marginTop: normalize(10),
  width: "100%",
  backgroundColor: Colors.black,
  flexDirection: "row",
  height: normalize(45)
},
titleDiv : {
  width: "15%",
  justifyContent: "center",
  alignItems: "center"
},
titleTxt : {
  fontSize: normalize(14),
  color: Colors.white,
  fontWeight: "800"
},
line : {
  height: normalize(45),
  width: .5,
  backgroundColor: Colors.graylight
},
subHeader : {
  width: "50%",
  justifyContent: "center",
  alignItems: "center"
},
subHeader2:{
  width: "15%",
  justifyContent: "center",
  alignItems: "center"
},
subHeader3:{
  width: "20%",
  justifyContent: "center",
  alignItems: "center"
},
detailHeader : {
  width: "100%",
  backgroundColor: Colors.white,
  // borderColor : Colors.grayDark,
  borderBottomWidth : .8,
  borderLeftWidth : .8,
  borderRightWidth : .8,
  flexDirection: "row",
  height: normalize(45)
},
detailDiv : {
  width: "15%",
  justifyContent: "center",
  alignItems: "center"
},
detailTxt : {
  fontSize: normalize(14),
  color: Colors.grayDark,
  fontWeight: "800"
},
darkLine : {
  height: normalize(45),
  width: .8,
  backgroundColor: Colors.black
},
detailView : {
  width: "85%",
  justifyContent: "center",
  alignItems: "center"
},
mdContainer : {
  height: normalize(220),
  width: "92%",
  alignSelf: "center",
  backgroundColor: Colors.white,
  borderRadius: normalize(6)
},
mdSub : {
  height: normalize(50),
  backgroundColor: Colors.pink,
  justifyContent: "center",
  paddingLeft: "5%"
},
mdTitle : {
  fontSize: normalize(14),
  color: Colors.white,
  fontWeight: "700"
},
mdSubContainer : {
  width: "90%",
  alignSelf: "center",
  marginTop: normalize(12)
},
mdSubTxt : {
  fontSize: normalize(14),
  color: Colors.grayDark
},
bottom : {
  position: "absolute",
  bottom: normalize(15),
  right: normalize(5),
  flexDirection: "row"
},
mdClose : {
  width: normalize(80),
  height: normalize(35),
  backgroundColor: "#6c757d",
  borderRadius: normalize(4),
  justifyContent: "center",
  alignItems: "center"
},
mdCloseTxt : {
  fontSize: normalize(14),
  color: Colors.white
},
mdSave : {
  marginLeft: normalize(15),
  width: normalize(130),
  height: normalize(35),
  backgroundColor: Colors.pink,
  borderRadius: normalize(4),
  justifyContent: "center",
  alignItems: "center"
}
});

export default styles;
