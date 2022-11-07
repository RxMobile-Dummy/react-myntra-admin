import { LogoutActionType } from "../../useCases/actionType/logoutActionType";
import { LogoutAction } from "../../useCases/actions/logoutAction";

type UserState = {
  logoutData: any;
  logoutError: string | undefined;
};

const initialState = {
  logoutData: undefined,
  logoutError: undefined,
  logoutState: true,
};

const logoutReducer = (
  state: UserState = initialState,
  action: LogoutAction
): any => {
  switch (action.type) {
    case LogoutActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutData: action.payload,
      };
    case LogoutActionType.LOGOUT_FAILED:
      return {
        ...state,
        logoutError: action.payload,
      };
    case LogoutActionType.LOGOUT_RESET:
      return {
        ...state,
        logoutData: action.payload,
        logoutError: action.payload,
      };

    default:
      return state;
  }
};

export default logoutReducer;
