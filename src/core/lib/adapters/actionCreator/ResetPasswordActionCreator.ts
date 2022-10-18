import { Dispatch } from "redux";
import { ResetPasswordActionType } from "../../useCases/actionType/resetPasswordActionType";
import { ResetPasswordAction } from "../../useCases/actions/resetPasswordAction";
import { postRequestGraphQL } from "../../Network/ApiCall";

interface Props {
  email: string;
  otp: string;
  newPassword: string;
  role: string;
}

export const ResetPassword = (user: Props) => {
  const query = `mutation ResetadminPassword($email: String!, $otp: String!, $newPassword: String!, $role: String!) {
    resetadminPassword(email: $email, otp: $otp, newPassword: $newPassword, role: $role) {
      message
      statusCode
    }
  }`;

  const requestData = {
    email: user.email,
    role: "admin",
    otp: user.otp,
    newPassword: user.newPassword,
  };

  return async (dispatch: Dispatch<ResetPasswordAction>) => {
    try {
      const data = await postRequestGraphQL(query, requestData);
      const response = data.resetadminPassword;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: ResetPasswordActionType.RESET_PASSWORD_SUCCESS,
          payload: response.message,
        });
      } else {
        dispatch({
          type: ResetPasswordActionType.RESET_PASSWORD_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ResetPasswordActionType.RESET_PASSWORD_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetPasswordResetState = () => {
  return async (dispatch: Dispatch<ResetPasswordAction>) => {
    dispatch({
      type: ResetPasswordActionType.RESET_PASSWORD_RESET,
      payload: undefined,
    });
  };
};
