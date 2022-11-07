import { LogoutAdminActionType } from "../../useCases/actionType/logoutAdminActionType";

interface LogoutAdmin {
  type: LogoutAdminActionType.LOGOUT_ADMIN_SUCCESS;
  payload: any;
}

interface LogoutAdminError {
  type: LogoutAdminActionType.LOGOUT_ADMIN_FAILED;
  payload: any;
}
interface LogoutAdminReset {
  type: LogoutAdminActionType.LOGOUT_ADMIN_RESET;
  payload: any;
}

export type LogoutAdminAction =  LogoutAdmin | LogoutAdminError | LogoutAdminReset

