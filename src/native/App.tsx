import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
// import  {store}  from "../core/lib/frameworks/redux";
import Navigation from "./src/navigators";

const App = () => {
 // console.log("Value of store is", store)
  return(
    //  <Provider store={store}>
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
    //  </Provider>
  )
}

export default App