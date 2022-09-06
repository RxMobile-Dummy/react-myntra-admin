import { ActionType } from "../actionType/loginActionTypes";
import { Action } from "../actions/loginAction";

const initialState = {
  loginData: [],
};

const reducer = (state: any = initialState, action: Action): any => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        loginData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
