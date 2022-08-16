import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.turquoise,
    justifyContent: 'center',
  },
  btnView: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  signInBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.turquoise,
  },
  signUpBtn: {
    backgroundColor: Colors.cyan,
    marginBottom: 20,
  },
});
export default styles;
