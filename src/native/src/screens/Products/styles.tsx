import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: Colors.primary,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
});

export default styles;
