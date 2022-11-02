import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigators'
import { Provider } from 'react-redux';
import Toast, { ErrorToast } from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from "core"

const App = () => {
  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 13,
        }}
        text1NumberOfLines={3}
      />
    ),
  };

    // console.log("store", store )

  return (
      <Provider store={store}>
      <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        <Toast config={toastConfig} />
        </PersistGate>
        </Provider>

    // <Text>Hettt</Text>
  );
};

export default App;
