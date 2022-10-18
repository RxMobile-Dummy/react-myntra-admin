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
    console.log("Change password called .....");
    try {
      console.log("userAuth",user.authToken)
    const data = await postRequestGraphQLAuth(query, requestData, user.authToken)
    console.log("change dataaa::::",data)
    const response = data.changeadminPassword
    console.log("Value of response is", response)
    if(response && response.statusCode === 200){
      dispatch({
        type: ChangePasswordActionType.CHANGE_PASSWORD_SUCCESS,
        payload: response.message
      });
    }else{
      dispatch({
        type: ChangePasswordActionType.CHANGE_PASSWORD_FAILED,
        payload: response.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ChangePasswordActionType.CHANGE_PASSWORD_FAILED,
      payload: error,
    });
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
