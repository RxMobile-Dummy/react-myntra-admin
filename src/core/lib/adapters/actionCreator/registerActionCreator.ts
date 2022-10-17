import { Dispatch } from "redux";
import { RegisterActionType } from "../../useCases/actionType/registerActionType";
import { RegisterAction } from "../../useCases/actions/registerAction";
import { postRequestGraphQL } from "../../Network/ApiCall";

interface Props {
  fullName: string;
  email: string;
  mobileNo: string;
  gender: string;
  dob: string;
  country:string;
  password: string;
  isVerified: Boolean;
  fcmToken: string;
  deviceId: string;
  platform: string;
}

export const Register = (user: Props) => {
  const query = `mutation RegisterAdmin($fullName: String!, $email: String!, $mobileNo: String!, $gender: String!, $dob: String!, $country: String!, $password: String!, $isVerified: Boolean!, $fcmToken: String!, $deviceId: String!, $platform: String!) {
    registerAdmin(fullName: $fullName, email: $email, mobileNo: $mobileNo, gender: $gender, dob: $dob, country: $country, password: $password, isVerified: $isVerified, fcmToken: $fcmToken, deviceId: $deviceId, platform: $platform) {
      data {
        _id
        fullName
        email
        mobileNo
        gender
        dob
        token
        isVerified
      }
      statusCode
      message
    }
  }
  `;

  const requestData = {
    fullName: user.fullName,
    email: user.email,
    mobileNo: user.mobileNo,
    gender: user.gender,
    dob: user.dob,
    country: user.country,
    password: user.password,
    isVerified: false,
    fcmToken: user.fcmToken,
    deviceId: user.deviceId,
    platform: user.platform,
  };

  return async (dispatch: Dispatch<RegisterAction>) => {
    console.log("Register called .....");
    try {
      const data = await postRequestGraphQL(query, requestData);
      const response = data.registerAdmin;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: RegisterActionType.REGISTER,
          payload: response.data,
        });
      } else {
        dispatch({
          type: RegisterActionType.REGISTER_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: RegisterActionType.REGISTER_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetRegisterState = () => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    dispatch({
      type: RegisterActionType.REGISTER_RESET,
      payload: undefined,
    });
  };
};
