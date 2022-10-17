import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

const reducers = combineReducers({
  auth: loginReducer,
  registerReducer: registerReducer,
  
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
