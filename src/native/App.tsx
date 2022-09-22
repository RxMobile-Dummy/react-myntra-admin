import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "core";
//import {REGISTER} from "core/lib/utils/graphqlProperties"
import Navigation from "./src/navigators";

const App = () => {
  return (
    
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
    </Provider>
    
  )
}

export default App