import { Dispatch } from "redux";
import { DeleteCategoryActionType } from "../../useCases/actionType/deleteCategoryByIdActionType";
import { postRequestGraphQLAuth } from "../../Network/ApiCall";
import { DeleteCategoryAction } from "../../useCases/actions/deleteCategoryByIdAction";

interface Props {
  categoryid: string;
  authToken: string;
}

export const DeleteCategory = (user: Props) => {
  const query = `query DeleteProductCategoryById($categoryid: String) {
    deleteProductCategoryById(categoryid: $categoryid) {
      message
      statusCode
      data {
        Categoryname
      }
    }
  }`;

  const requestData = {
    categoryid: user.categoryid,
    authToken: user.authToken,
  };

  return async (dispatch: Dispatch<DeleteCategoryAction>) => {
    // console.log("Dispatch Category called .....");
    try {
      const data = await postRequestGraphQLAuth(
        query,
        requestData,
        user.authToken
      );

      const response = data.deleteProductCategoryById;
      // console.log("Value of response is", response);
      if (response && response.statusCode === 201) {
        dispatch({
          type: DeleteCategoryActionType.DELETE_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: DeleteCategoryActionType.DELETE_CATEGORY_FAILED,
          payload: response.message,
        });
      }
    } catch (error) {
      dispatch({
        type: DeleteCategoryActionType.DELETE_CATEGORY_FAILED,
        payload: error,
      });
    }
  };
};

export const ResetDeleteCategoryState = () => {
  return async (dispatch: Dispatch<DeleteCategoryAction>) => {
    dispatch({
      type: DeleteCategoryActionType.DELETE_CATEGORY_RESET,
      payload: undefined,
    });
  };
};
