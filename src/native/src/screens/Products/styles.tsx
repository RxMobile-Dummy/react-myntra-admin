import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
import { commonStyles, normalize } from '../../utils/commonStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : Colors.bgColor
  },
  subHeader : {
    backgroundColor : Colors.black,
    height: normalize(50),
    justifyContent : "center",
    alignItems : "center"
  },
  headerTxt : {
    fontSize : normalize(16),
    color: Colors.white
  },
  center : {
    width : "90%", 
    alignSelf : "center", 
  },
  labelTxt : {
    fontSize : normalize(14),
    color: "#555555",
    fontWeight : "bold"
  },
  dropView : {
    width: "100%",
    height: normalize(35),
    backgroundColor : "rgb(229,229,229)",
    marginTop : normalize(6),
    flexDirection : "row",
    borderRadius : normalize(6)
  },
  firstDiv : {
    width: "85%",
    paddingLeft : normalize(15),
    justifyContent : "center"
  },
  placeTxt : {
    fontSize : normalize(14),
    color: Colors.grayDark
  },
  secondDiv : {
    width: "15%",
    justifyContent : "center",
    alignItems : "center"
  },
  upload : { 
    width: "40%", 
    paddingLeft : normalize(10), 
    height: normalize(30), 
    justifyContent :"center",
    borderWidth: .8, 
    borderColor: Colors.grayDark, 
    marginTop : normalize(10), 
    borderRadius : normalize(6) 
  },
  checkContainer : { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: normalize(10),  
  },
  check : { 
    height: normalize(20), 
    width: normalize(20), 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: normalize(4), 
    borderWidth: .8, 
    borderColor: Colors.grayDark, 
    marginRight: normalize(6) 
  },
  touchContainer: {
    justifyContent : "center", 
    alignItems : "center", 
    flex : 1
  },
  touchTxt : {
    fontSize : normalize(14), 
    color : Colors.white, 
    fontWeight : "bold"
  }
});

export default styles;
