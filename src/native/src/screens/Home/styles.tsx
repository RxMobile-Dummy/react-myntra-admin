import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
import { normalize } from '../../utils/commonStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flContainer : { 
    marginTop: "15%", 
    width: "95%", 
    alignSelf: "center", 
  },
  item : {
    justifyContent : "center",
    alignItems : "center",
    height: normalize(110),
    flex: 1,
    margin : normalize(8),
  },
  blankDiv : {
    backgroundColor: 'transparent'
  },
  linear : {
    width : "100%", 
    height : normalize(110),
    borderRadius : normalize(10)
  }
});

export default styles;
