import { Dispatch } from "redux";
import { ActionType } from "../../useCases/actionType/categoryActionTypes";
import { postRequestGraphQL } from "../../Network/ApiCall";
import { Action } from "../../useCases/actions";

interface Props {
    id: string;
    name: string;
}

export const Login = (user: Props) => {
    const query = `mutation categoryAdminCall($id: String!, $name: String!) {
    categoryAdmin(id: $id,  name: $name) {
    statusCode
    message
    data {
       _id
    }
    }
  }`;

    const requestData = {
        id: user.id,
        name: user.name
    };

    return async (dispatch: Dispatch<Action>) => {
        // console.log("Login called .....", requestData);
        try {
            const data = await postRequestGraphQL(query, requestData);

            //   console.log("login response data", data);
            const response = data.loginAdmin;
            // console.log("Value of response is", response);
            if (response && response.statusCode === 200) {
                dispatch({
                    type: ActionType.CATEGORY,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: ActionType.CATEGORY_FAILED,
                    payload: response.message,
                });
            }
        } catch (error) {
            dispatch({
                type: ActionType.CATEGORY_FAILED,
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
