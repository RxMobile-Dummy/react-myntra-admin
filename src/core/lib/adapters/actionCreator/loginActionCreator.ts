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

export const isLoggedIn = (payload : boolean) => {
  return async (dispatch : Dispatch<Action>) => {
    dispatch({
      type : ActionType.LOGIN_TOKEN,
      payload : payload
    })
  }
}

export const userData = (payload : any) => {
  return async (dispatch : Dispatch<Action>) => {
    dispatch({
      type : ActionType.LOGIN_USER,
      payload : payload
    })
  }
}

export const Login = (user: Props) => {
  const query = `mutation LoginAdmin($email: String!, $password: String!, $fcmToken: String!, $deviceId: String!) {
    loginAdmin(email: $email, password: $password, fcmToken: $fcmToken, deviceId: $deviceId) {
      message
      statusCode
      data {
        
        fullName
        email
        token
        mobileNo
        gender
        dob
        deviceId
        _id
        role
        _id
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
    // console.log("Login called .....", requestData);
    try {
      const data = await postRequestGraphQL(query, requestData);
      // console.log("login response data", data);
      const response = data.loginAdmin;
      // console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: ActionType.LOGIN,
          payload: response.data,
        });
        return { status: true, data: response.data };
          // getToken(response.data)
      } else {
        dispatch({
          type: ActionType.LOGIN_FAILED,
          payload: response.message,
        });
        return { status: false, data: response.message };
      }
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_FAILED,
        payload: error,
      });
      return { status: false, data: error };
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
