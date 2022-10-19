import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import changePasswordReducer from "./changePasswordReducer";
import categoryReducer from "./categoryReducer";


const reducers = combineReducers({
  auth: loginReducer,
  registerReducer: registerReducer,
  changePasswordReducer: changePasswordReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  resetPasswordReducer: resetPasswordReducer,
  categoryReducer :categoryReducer
  
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
