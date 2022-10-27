import { ActionType } from "../../useCases/actionType/loginActionTypes";

interface Login {
  type: ActionType.LOGIN;
  payload: any;
}

interface LoginError {
  type: ActionType.LOGIN_FAILED;
  payload: any;
}
interface LoginReset {
  type: ActionType.LOGIN_RESET;
  payload: any;
}
interface isLoggedIn {
  type: ActionType.LOGIN_TOKEN;
  payload: any;
}

interface loginUser {
  type: ActionType.LOGIN_USER;
  payload: any;
}

export type Action =  Login | LoginError | LoginReset | isLoggedIn | loginUser;

