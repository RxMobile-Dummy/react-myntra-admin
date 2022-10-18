import { Dispatch } from "redux";
import { ActionType } from '../../useCases/actionType/loginActionTypes';
import { postRequestGraphQL } from '../../Network/ApiCall';
import { Action } from '../../useCases/actions';
// import  {PostApi,postRequest}  from "../network/ApiCall";

interface Props {
    email: string;
    password: string;
    fcmToken: string;
    deviceId: string;
    role: string;
}

export const Category = (user: Props) => {
    const query = `mutation categoryAdmin($category: String!, $id: String!) {
    categoryAdmin(category: $category, id: $id) {
    statusCode
    message
    data {
       _id
    }
    }
  }`

    const requestData = {
        "category": category.name,
        "id": category.id
    }

    return async (dispatch: Dispatch<Action>) => {
        // console.log("Login called .....", requestData);
        try {
            const data = await postRequestGraphQL(query, requestData)
            const response = data.loginUser
            console.log("Value of response is", response)
            if (response && response.statusCode === 200) {
                dispatch({
                    type: ActionType.LOGIN,
                    payload: response.data
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

export const ResetCategoryState = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN_RESET,
            payload: undefined,
        });
    }
}
