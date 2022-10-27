import { ActionType } from "../../useCases/actionType";
import { Action } from "../../useCases/actions";

type UserState = {
  loginData: any;
  error: any;
  token : boolean
};

const initialState = {
  loginData: undefined,
  error: undefined,
  token : false,
  user : {}
};

const loginReducer = (state: UserState = initialState, action: Action): any => {
   console.log("action payload:", action.payload);

  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        loginData: action.payload,
      };
    case ActionType.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ActionType.LOGIN_RESET:
      return {
        ...state,
        error: action.payload,
        loginData: action.payload,
      };
      case ActionType.LOGIN_TOKEN:
        return {
          ...state,
          token: action.payload,
        };
        case ActionType.LOGIN_USER:
          return {
            ...state,
            user: action.payload,
          };
    default:
      return state;
  }
};

export default loginReducer;
