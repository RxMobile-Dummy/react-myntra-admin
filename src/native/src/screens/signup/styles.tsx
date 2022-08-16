import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgetBlue',
    justifyContent: 'center',
  },
  signInBtn: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.turquoise,
    alignSelf: 'center',
  },
});
export default styles;
