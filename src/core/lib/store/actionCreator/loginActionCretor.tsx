import { Dispatch } from "redux";
import { ActionType } from "../actionType/loginActionTypes";
import { Action } from "../actions/loginAction";
import axios from "axios";

export const login = () => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await axios.get("https://randomuser.me/api/");
    console.log("Value is", response.data);
    dispatch({
      type: ActionType.LOGIN,
      payload: response.data,
    });
  };
};

