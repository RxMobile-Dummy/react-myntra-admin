import { ActionType } from "../actionType/loginActionTypes";

interface Login {
  type: ActionType.LOGIN;
  payload: any;
}

interface Register {
  type : ActionType.REGISTER;
  payload : any
}

export type Action =  Login | Register;
