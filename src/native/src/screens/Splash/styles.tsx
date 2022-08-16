import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.turquoise,
    flex: 1,
  },
  container: {
    margin: 20,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.tertiary,
    padding: 20,
    width: wp('70%'),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-MediumItalic',
  },
  image: {
    transform: [{rotate: '-15deg'}],
    marginBottom: hp('5%'),
  },
  welcomeImg: {
    height: hp('40%'),
    flex: 1,
    width: wp('90%'),
  },
});
export default styles;
