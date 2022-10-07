import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "core";
import Navigation from "./src/navigators";
import {View, Text} from "react-native"
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const App = () => {

  const toastConfig = {
    success: (props : any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    error: (props : any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),

    tomatoToast: ({ text1 , props } : any) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };

  useEffect(() => {

  },[])

  return (
    <Provider store={store}>

      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast config={toastConfig}/>
    </Provider>
  )
}

export default App