import { Dispatch } from "redux";
import { ActionType } from "../actionType/loginActionTypes";
import { Action } from "../actions/loginAction";
import  {PostApi,postRequest}  from "../../Network/ApiCall";

export  const Login = (user : any) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await postRequest("login",user);
    console.log("Value of response is", response.data)
    dispatch({
      type: ActionType.LOGIN,
      payload: response.data
    });
  };
  //console.log("***********************")
};

