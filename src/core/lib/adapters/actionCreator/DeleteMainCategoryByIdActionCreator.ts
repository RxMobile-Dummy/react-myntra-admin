import { Dispatch } from "redux";
import { DeleteMainCategoryActionType } from "../../useCases/actionType/deleteMainCategoryByIdActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { DeleteMainCategoryAction } from "../../useCases/actions/deleteMainCategoryByIdAction";

interface Props {
  productid: string;
  authToken: string;
}

export const DeleteMainCategory = (user: Props) => {
  const query = `query DeleteMainCategoryById($productid: String) {
    deleteMainCategoryById(productid: $productid) {
      message
      statusCode
      data {
        mainCategory
      }
    }
  }`;

  const requestData = {
    productid: user.productid,
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<DeleteMainCategoryAction>) => {
    console.log("DElete Main Category called .....", requestData);
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.deleteMainCategoryById;
      console.log("Value of response is", response);
      if (response && response.statusCode === 201) {
        dispatch({
          type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_SUCCESS,
          payload: response.message,
        });
      } else {
        dispatch({
          type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetDeleteMainCategoryState = () => {
  return async (dispatch: Dispatch<DeleteMainCategoryAction>) => {
    dispatch({
      type: DeleteMainCategoryActionType.DELETE_MAIN_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
