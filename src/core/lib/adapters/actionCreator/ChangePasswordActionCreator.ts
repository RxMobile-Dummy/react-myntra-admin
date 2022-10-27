import { Dispatch } from "redux";
import { ChangePasswordActionType } from "../../useCases/actionType/changePasswordActionType";
import { ChangePasswordAction } from "../../useCases/actions/changePasswordAction";
import  {postRequestGraphQLAuth}  from "../../Network/ApiCall";

interface Props {
  adminId: string;
  oldPassword: string;
  newPassword: string;
  authToken: string;
}

export const ChangePassword = (user : Props) => {

  const query = `mutation ChangeadminPassword($adminId: String!, $oldPassword: String!, $newPassword: String!) {
    changeadminPassword(adminId: $adminId, oldPassword: $oldPassword, newPassword: $newPassword) {
      statusCode
      message
    }
  }`

  const requestData = {
    "adminId": user.adminId,
    "oldPassword": user.oldPassword,
    "newPassword": user.newPassword,
  }

  return async (dispatch: Dispatch<ChangePasswordAction>) => {
    try {
    const data = await postRequestGraphQLAuth(query, requestData, user.authToken)
    const response = data.changeadminPassword
    if(response && response.statusCode === 200){
      dispatch({
        type: ChangePasswordActionType.CHANGE_PASSWORD_SUCCESS,
        payload: response.message
      });
      return { status : true, message : response.message }
    }else{
      dispatch({
        type: ChangePasswordActionType.CHANGE_PASSWORD_FAILED,
        payload: response.message,
      });
      return { status : false, message : response.message }
    }
  } catch (error) {
    dispatch({
      type: ChangePasswordActionType.CHANGE_PASSWORD_FAILED,
      payload: error,
    });
    return { status : false, message : error }

  }
  };
};

export const ResetChangePasswordState = () => {
  return async (dispatch: Dispatch<ChangePasswordAction>) => {
    dispatch({
      type: ChangePasswordActionType.CHANGE_PASSWORD_RESET,
      payload: undefined,
    });
  }
}
