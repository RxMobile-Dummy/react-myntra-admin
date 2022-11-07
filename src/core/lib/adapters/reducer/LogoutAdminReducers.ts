import { LogoutAdminActionType } from "../../useCases/actionType/logoutAdminActionType";
import { LogoutAdminAction } from "../../useCases/actions/LogoutAdminAction";

type UserState = {
  adminData: any;
  error3: string | undefined;
};

const initialState = {
    adminData: undefined,
  error3: undefined,
};

const LogoutAdminReducers = (
  state: UserState = initialState,
  action: LogoutAdminAction
): any => {
  // console.log("action payload:", action.payload);
  switch (action.type) {
    case LogoutAdminActionType.LOGOUT_ADMIN_SUCCESS:
      return {
        ...state,
        adminData: action.payload,
      };
    case LogoutAdminActionType.LOGOUT_ADMIN_FAILED:
      return {
        ...state,
        error3: action.payload,
      };
    case LogoutAdminActionType.LOGOUT_ADMIN_FAILED:
      return {
        ...state,
        adminData: action.payload,
        error3: action.payload,
      };
    default:
      return state;
  }
};

export default LogoutAdminReducers;
