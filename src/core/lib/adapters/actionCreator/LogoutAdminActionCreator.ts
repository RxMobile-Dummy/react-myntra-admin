import { Dispatch } from "redux";
import { LogoutAdminActionType } from "../../useCases/actionType/logoutAdminActionType";
// import { postRequestGraphQL } from "../../Network/ApiCall";
import { getRequest, postRequestGraphQLAuth } from "../../Network/ApiCall";
import { LogoutAdminAction } from "../../useCases/actions/LogoutAdminAction";

interface Props {
    adminId: any;
    authToken: string;
}

export const LogoutAdmin = (user: Props) => {
  /////NOT WORKING
  const query = `mutation LogoutAdmin($adminId: String!, $authToken: String!) {
    logoutAdmin(adminId: $adminId, authToken: $authToken) {
      message
      statusCode
    }
  }`;

  const requestData = {
    adminId: user.adminId,
    authToken : user.authToken
  };

  return async (dispatch: Dispatch<LogoutAdminAction>) => {
    console.log("Get Category by id called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.logoutAdmin;
      console.log("Value of response is", response);
      if ((response && response.statusCode === 200) || response.statusCode === 201) {
        dispatch({
          type: LogoutAdminActionType.LOGOUT_ADMIN_SUCCESS,
          payload: response.data,
        });
        return { status : true, resultData : response.data }
      } else {
        dispatch({
          type: LogoutAdminActionType.LOGOUT_ADMIN_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.data }

      }
    } catch (error) {
      dispatch({
        type: LogoutAdminActionType.LOGOUT_ADMIN_FAILED,
        payload: error,
      });
      return { status : false, resultData : error }
    }
  };
};

