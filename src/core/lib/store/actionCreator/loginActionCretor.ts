import { Dispatch } from "redux";
import { ActionType } from "../actionType/loginActionTypes";
import { Action } from "../actions/loginAction";
import  {PostApi, GraphPost}  from "../../Network/ApiCall";

export const Register = (query: any, variables: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await GraphPost(query, variables);
    dispatch({
      type: ActionType.REGISTER,
      payload: response
    });
  };
}