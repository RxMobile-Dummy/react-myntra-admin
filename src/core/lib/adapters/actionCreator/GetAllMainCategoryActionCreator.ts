import { Dispatch } from "redux";
import { GetAllMainCategoryActionType } from "../../useCases/actionType/getAllMainCategoryActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
// import { getRequest } from "../../Network/ApiCall";
import { GetAllMainCategoryAction } from "../../useCases/actions/getAllMainCategoryAction";

interface Props {
  authToken: string;
}

export const GetAllMainCategory = (user: Props) => {
  const query = `query GetAllMainCategory {
    getAllMainCategory {
      message
      statusCode
      data {
        _id
        mainCategory        
      }
    }
  }`;

  const requestData = {
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<GetAllMainCategoryAction>) => {
    // console.log("Get Category called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.getAllMainCategory;
      // console.log("Value of response is", response);
      if (response && response.statusCode === 201) {
        dispatch({
          type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetGetAllMainCategoryState = () => {
  return async (dispatch: Dispatch<GetAllMainCategoryAction>) => {
    dispatch({
      type: GetAllMainCategoryActionType.GET_MAIN_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
