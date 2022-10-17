import { Dispatch } from "redux";
import { ActionType } from "../../useCases/actionType/loginActionTypes";
import { postRequestGraphQL } from "../../Network/ApiCall";
import { Action } from "../../useCases/actions";

interface Props {
  email: string;
  password: string;
  fcmToken: string;
  deviceId: string;
}

export const Login = (user: Props) => {
  const query = `mutation loginAdminCall($fcmToken: String!, $password: String!, $email: String!, $deviceId: String!) {
    loginAdmin(fcmToken: $fcmToken,  password: $password, email: $email, deviceId: $deviceId) {
    statusCode
    message
    data {
       _id
     fullName
     email
     mobileNo
     gender
     dob
     deviceId  
    }
    }
  }`;

  const requestData = {
    email: user.email,
    password: user.password,
    fcmToken: "",
    deviceId: "",
  };

  return async (dispatch: Dispatch<Action>) => {
    console.log("Login called .....", requestData);
    try {
      const data = await postRequestGraphQL(query, requestData);

      console.log("login response data", data);
      const response = data.loginAdmin;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: ActionType.LOGIN,
          payload: response.data,
        });
      } else {
        dispatch({
          type: ActionType.LOGIN_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetLoginState = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_RESET,
      payload: undefined,
    });
  };
};
