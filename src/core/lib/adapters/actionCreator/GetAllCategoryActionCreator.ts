import { Dispatch } from "redux";
import { GetCategoryActionType } from "../../useCases/actionType/getAllCategoryActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { getRequest } from "../../Network/ApiCall";
import { GetCategoryAction } from "../../useCases/actions/getAllCategoryAction";

interface Props {
  authToken: string;
}

export const GetAllCategory = (user: Props) => {
  const query = `query GetAllProductCategories {
    getAllProductCategories {
      message
      statusCode
      data {
        _id
        Categoryname
        mainCategory {
          mainCategory
          _id
        }        
      }
    }
  }`;

  const requestData = {
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<GetCategoryAction>) => {
    console.log("Get Category called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.getAllProductCategories;
      console.log("Value of response is", response);
      if (response && response.statusCode === 200) {
        dispatch({
          type: GetCategoryActionType.GET_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GetCategoryActionType.GET_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GetCategoryActionType.GET_CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetGetCategoryState = () => {
  return async (dispatch: Dispatch<GetCategoryAction>) => {
    dispatch({
      type: GetCategoryActionType.GET_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
