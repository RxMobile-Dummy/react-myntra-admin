import { Dispatch } from "redux";
import { ForgotPasswordActionType } from "../../useCases/actionType/forgotPasswordActionType";
import { ForgotPasswordAction } from "../../useCases/actions/forgotPasswordAction";
import { postRequestGraphQL } from "../../Network/ApiCall";

interface Props {
  email: string;
  role: string;
}

export const ForgotPassword = (user: Props) => {
  const query = `mutation ForgotadminPassword($email: String!, $role: String!) {
    forgotadminPassword(email: $email, role: $role) {
      statusCode
      message
    }
  }`;

  const requestData = {
    email: user.email,
    role: "admin",
  };

  return async (dispatch: Dispatch<ForgotPasswordAction>) => {
    console.log("Forgot password called .....");
    try {
      const data = await postRequestGraphQL(query, requestData);
      console.log("response data:::::", data);
      const response = data.forgotadminPassword;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: ForgotPasswordActionType.FORGOT_PASSWORD_SUCCESS,
          payload: response.message,
        });
        return { status : true, resultData : response.message }
      } else {
        dispatch({
          type: ForgotPasswordActionType.FORGOT_PASSWORD_FAILED,
          payload: response.message,
        });
        return { status : false, resultData : response.message }

      }
    } catch (error) {
      dispatch({
        type: ForgotPasswordActionType.FORGOT_PASSWORD_FAILED,
        payload: error,
      });
      return { status : true, resultData : error }

    }
  };
};

export const ResetForgotPasswordState = () => {
  return async (dispatch: Dispatch<ForgotPasswordAction>) => {
    dispatch({
      type: ForgotPasswordActionType.FORGOT_PASSWORD_RESET,
      payload: undefined,
    });
  };
};
