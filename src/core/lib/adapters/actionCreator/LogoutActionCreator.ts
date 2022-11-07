import { Dispatch } from "redux";
import { LogoutActionType } from "../../useCases/actionType/logoutActionType";
import { ActionType } from "../../useCases/actionType/loginActionTypes";
import { LogoutAction } from "../../useCases/actions";
import { Action } from "../../useCases/actions/loginAction";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";

interface Props {
  adminId: string;
  authToken: string;
}

export const isLoggedIn = (payload: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_TOKEN,
      payload: payload,
    });
  };
};

export const Logout = (user: Props) => {
  const query = `mutation LogoutAdmin($adminId: String!, $authToken: String!) {
    logoutAdmin(adminId: $adminId, authToken: $authToken) {
      message
      statusCode
      data {
        fullName
        email
        token
      }
    }
  }`;

  const requestData = {
    adminId: user.adminId,
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<LogoutAction>) => {
    // console.log("Logout dispatched called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );
      const response = data.logoutAdmin;
      let responseData = response.data;
      // console.log("Value of response is", response);
      // const newResponse = Object.assign(responseData, {isLoginFlag: false});
      if (response && response.statusCode == 200) {
        dispatch({
          type: LogoutActionType.LOGOUT_SUCCESS,
          payload: response.message,
        });
        return { status: true, data: response.message };
      } else {
        dispatch({
          type: LogoutActionType.LOGOUT_FAILED,
          payload: response.message,
        });
        return { status: false, data: response.data };
      }
    } catch (error) {
      dispatch({
        type: LogoutActionType.LOGOUT_FAILED,
        payload: error,
      });
      return { status: false, data: error };
    }
  };
};

export const ResetLogoutState = () => {
  return async (dispatch: Dispatch<LogoutAction>) => {
    dispatch({
      type: LogoutActionType.LOGOUT_RESET,
      payload: undefined,
    });
  };
};
