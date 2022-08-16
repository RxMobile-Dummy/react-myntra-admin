import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  signInBtn: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.turquoise,
    alignSelf: 'center',
  },
  googleBtn: {
    width: '70%',
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  fbBtn: {
    width: '70%',
    height: 50,
    marginTop: 10,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: Colors.tertiary,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 2},
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  fbBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
});
export default styles;
