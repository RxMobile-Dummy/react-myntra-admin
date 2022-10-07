import { Dispatch } from "redux";
import { ActionType } from "../../useCases/actionType";
import { Action } from "../../useCases/actions";
import  {PostApi, GraphPost}  from "../../Network/ApiCall";

export const Register = (query: any, variables: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await GraphPost(query, variables);
    console.log("Value of response is", response)
    dispatch({
      type: ActionType.REGISTER,
      payload: response
    });
  };
}

export const Login = (query: any, variables: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await GraphPost(query, variables);
    dispatch({
      type: ActionType.LOGIN,
      payload: response
    });
  };
}