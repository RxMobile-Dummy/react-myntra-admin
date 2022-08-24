import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainer : { 
    alignItems: "center", 
    justifyContent: "center", 
    flex: 1, 
    width: "90%", 
    alignSelf: "center" 
  },
  img : { 
    height: normalize(105), 
    width: "100%" 
  },
  header : { 
    backgroundColor: Colors.white, 
    paddingTop: normalize(15), 
    width: "100%", 
    height: normalize(350) 
  },
  lgTxt: { 
    fontSize: normalize(18), 
    color: Colors.pink, 
    fontWeight: "600" 
  },
  box : { 
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
  footer : { 
    marginTop: normalize(20), 
    paddingLeft: normalize(5) 
  },
  txt : { 
    fontSize: normalize(14), 
    color: "#585757" 
  },
  subTxt : { 
    fontSize: normalize(14), 
    color: Colors.pink, 
    fontWeight: "800" 
  },
  top : { 
    marginTop: normalize(20) 
  },
  lgContainer : { 
    alignItems: "center", 
    justifyContent: "center", 
    height: normalize(45) 
  },
  lg : { fontSize: normalize(14), color: "#fff" }
});
export default styles;
