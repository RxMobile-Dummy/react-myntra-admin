import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import changePasswordReducer from "./changePasswordReducer";
import addCategoryReducer from "./addCategoryReducer";
import getAllCategoryReducer from "./getAllCategoryReducer";
import deleteCategoryReducer from "./deleteCategoryByIdReducer";
import updateCategoryReducer from "./updateCategoryByIdReducer";
import addMainCategoryReducer from "./addMainCategoryReducer";
import getAllMainCategoryReducer from "./getAllMainCategoryReducer";
import getMainCategoryByIdReducer from "./getMainCategoryByIdReducer";
import deleteMainCategoryReducer from "./deleteMainCategoryByIdReducer";
import updateMainCategoryReducer from "./updateMainCategoryByIdReducer";

const reducers = combineReducers({
  auth: loginReducer,
  registerReducer: registerReducer,

  changePasswordReducer: changePasswordReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  resetPasswordReducer: resetPasswordReducer,

  addCategoryReducer: addCategoryReducer,
  getAllCategoryReducer: getAllCategoryReducer,
  deleteCategoryReducer: deleteCategoryReducer,
  updateCategoryReducer: updateCategoryReducer,

  addMainCategoryReducer: addMainCategoryReducer,
  getAllMainCategoryReducer: getAllMainCategoryReducer,
  getMainCategoryByIdReducer: getMainCategoryByIdReducer,
  deleteMainCategoryReducer: deleteMainCategoryReducer,
  updateMainCategoryReducer: updateMainCategoryReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
